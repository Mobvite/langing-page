// Vitalita landing page - escena 3D decorativa del Hero (Three.js)
// Un corazón estilizado en la paleta del producto, con rotación lenta y flotado sutil.
// La imagen estática heart.png sigue en el HTML como respaldo: solo se oculta cuando
// la escena ya dibujó su primer cuadro. No se inicializa en pantallas de 900px o menos
// ni con prefers-reduced-motion, y en esos casos Three.js ni siquiera se descarga.

(function () {
    // Versión fijada a 0.170.0: es la última en cdnjs con el módulo minificado en un solo archivo
    // (~136 KB comprimido). Desde 0.172 se divide en dos y cdnjs sirve el núcleo sin minificar.
    var THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.module.min.js';
    var MAX_PIXEL_RATIO = 2;

    var heroImage = document.querySelector('.hero-image');
    var desktopQuery = window.matchMedia('(min-width: 901px)');
    var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!heroImage || !desktopQuery.matches || reducedMotionQuery.matches) return;
    if (!window.WebGLRenderingContext) return;

    // import() dinámico: no requiere bundler y, si la CDN falla, el catch deja la imagen estática
    import(THREE_URL).then(startScene).catch(function (error) {
        console.warn('[Vitalita Landing] Escena 3D no disponible, se muestra la imagen estática.', error);
    });

    function createHeartGeometry(THREE) {
        var shape = new THREE.Shape();
        shape.moveTo(5, 5);
        shape.bezierCurveTo(5, 5, 4, 0, 0, 0);
        shape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
        shape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
        shape.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
        shape.bezierCurveTo(16, 7, 16, 0, 10, 0);
        shape.bezierCurveTo(7, 0, 5, 5, 5, 5);

        // Bisel amplio: da el volumen redondeado, tipo almohadilla, en vez de un corazón plano
        var geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 3,
            bevelEnabled: true,
            bevelThickness: 3.2,
            bevelSize: 2.6,
            bevelSegments: 16,
            curveSegments: 40
        });
        geometry.center();
        geometry.rotateZ(Math.PI);   // la forma se dibuja con la punta hacia arriba

        // Degradado vertical entre los dos teal del producto
        var bottomColor = new THREE.Color(0x0F766E);
        var topColor = new THREE.Color(0x14B8A6);
        var positions = geometry.attributes.position;
        geometry.computeBoundingBox();
        var minY = geometry.boundingBox.min.y;
        var height = geometry.boundingBox.max.y - minY;
        var colors = new Float32Array(positions.count * 3);
        var vertexColor = new THREE.Color();
        for (var i = 0; i < positions.count; i++) {
            vertexColor.copy(bottomColor).lerp(topColor, (positions.getY(i) - minY) / height);
            colors[i * 3] = vertexColor.r;
            colors[i * 3 + 1] = vertexColor.g;
            colors[i * 3 + 2] = vertexColor.b;
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return geometry;
    }

    function startScene(THREE) {
        var canvas = document.createElement('canvas');
        canvas.className = 'hero-scene-canvas';
        canvas.setAttribute('aria-hidden', 'true');   // decorativo: fuera del árbol de accesibilidad y del foco

        var renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        } catch (error) {
            console.warn('[Vitalita Landing] WebGL no disponible, se muestra la imagen estática.', error);
            return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
        camera.position.set(0, 0, 78);

        // Luz cálida y difusa: hemisférica + una direccional suave, sin brillos duros
        scene.add(new THREE.HemisphereLight(0xFFF7ED, 0xCCFBF1, 2.2));
        var keyLight = new THREE.DirectionalLight(0xFFEDD5, 1.6);
        keyLight.position.set(18, 26, 40);
        scene.add(keyLight);

        var heartGroup = new THREE.Group();
        scene.add(heartGroup);

        var heart = new THREE.Mesh(
            createHeartGeometry(THREE),
            new THREE.MeshPhysicalMaterial({
                vertexColors: true,
                roughness: 0.42,
                metalness: 0,
                clearcoat: 0.35,
                clearcoatRoughness: 0.7
            })
        );
        heartGroup.add(heart);

        // Órbita con cuentas: sugiere "salud digital" sin volver la figura clínica
        var orbit = new THREE.Group();
        orbit.rotation.set(Math.PI / 2.4, 0, Math.PI / 9);
        heartGroup.add(orbit);

        orbit.add(new THREE.Mesh(
            new THREE.TorusGeometry(19, 0.12, 12, 120),
            new THREE.MeshBasicMaterial({ color: 0x14B8A6, transparent: true, opacity: 0.45 })
        ));

        var beadMaterial = new THREE.MeshStandardMaterial({ color: 0x5EEAD4, roughness: 0.5 });
        var beadSizes = [1.1, 0.7, 0.9];
        beadSizes.forEach(function (size, index) {
            var bead = new THREE.Mesh(new THREE.SphereGeometry(size, 24, 24), beadMaterial);
            var angle = (index / beadSizes.length) * Math.PI * 2;
            bead.position.set(Math.cos(angle) * 19, Math.sin(angle) * 19, 0);
            orbit.add(bead);
        });

        function resize() {
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            if (!width || !height) return;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        // Reacción leve al mouse: inclina la figura unos pocos grados, con suavizado
        var pointerTarget = { x: 0, y: 0 };
        var pointer = { x: 0, y: 0 };
        window.addEventListener('pointermove', function (event) {
            if (event.pointerType !== 'mouse') return;
            pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });

        var clock = new THREE.Clock();
        var elapsed = 0;

        function renderFrame() {
            elapsed += Math.min(clock.getDelta(), 0.1);   // tope: sin saltos al volver de una pausa
            pointer.x += (pointerTarget.x - pointer.x) * 0.04;
            pointer.y += (pointerTarget.y - pointer.y) * 0.04;

            heart.rotation.y = elapsed * 0.35;                           // rotación lenta y continua
            heartGroup.position.y = Math.sin(elapsed * 0.9) * 1.1;      // flotado sutil
            heartGroup.rotation.x = pointer.y * 0.12;
            heartGroup.rotation.z = -pointer.x * 0.08;
            orbit.rotation.z = Math.PI / 9 + elapsed * 0.25;

            renderer.render(scene, camera);
        }

        // El render solo corre con la pestaña visible, el Hero en pantalla y ancho de escritorio
        var heroInView = true;
        var frameId = null;

        function loop() {
            renderFrame();
            frameId = requestAnimationFrame(loop);
        }

        function updateRunning() {
            var shouldRun = heroInView && !document.hidden && desktopQuery.matches;
            if (shouldRun && frameId === null) {
                clock.getDelta();
                frameId = requestAnimationFrame(loop);
            } else if (!shouldRun && frameId !== null) {
                cancelAnimationFrame(frameId);
                frameId = null;
            }
        }

        heroImage.insertBefore(canvas, heroImage.firstChild);
        resize();
        renderFrame();
        heroImage.classList.add('has-scene');   // recién ahora se oculta la imagen estática

        // Si el navegador pierde el contexto WebGL, vuelve la imagen estática
        canvas.addEventListener('webglcontextlost', function () {
            heroImage.classList.remove('has-scene');
        });
        canvas.addEventListener('webglcontextrestored', function () {
            heroImage.classList.add('has-scene');
        });

        if ('ResizeObserver' in window) {
            new ResizeObserver(resize).observe(canvas);
        } else {
            window.addEventListener('resize', resize);
        }

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                heroInView = entries[0].isIntersecting;
                updateRunning();
            }).observe(heroImage);
        }

        document.addEventListener('visibilitychange', updateRunning);
        desktopQuery.addEventListener('change', updateRunning);
        updateRunning();
    }
})();

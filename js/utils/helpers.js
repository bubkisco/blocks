function setOrientationControls(e) {
    if (!e.alpha) {
        return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    window.removeEventListener('deviceorientation', setOrientationControls, true);

    renderer.domElement.addEventListener('click', function () {

        if (this.requestFullscreen) {
            this.requestFullscreen();
        } else if (this.msRequestFullscreen) {
            this.msRequestFullscreen();
        } else if (this.mozRequestFullScreen) {
            this.mozRequestFullScreen();
        } else if (this.webkitRequestFullscreen) {
            this.webkitRequestFullscreen();
        }

    });

    //renderer = new THREE.StereoEffect(renderer);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //mobile = true;
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

var envMaps = []; 
for ( var i = 0; i < 3; i ++ ) {
    var fileName = "block_test" + i.toString() + ".jpg";
    envMaps[i] = {file: fileName, size: 1024};
    // var envMaps = [
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test2.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    //     {file: "block_test.jpg", size: 1024},
    // ];
}
function getCubeMap(index) {
    var cubeMap = new THREE.Texture([]);
    cubeMap.format = THREE.RGBFormat;
    cubeMap.flipY = false;

   

    var loader = new THREE.ImageLoader();
    var pre = "assets/textures/";
    // if (user)
    //     pre = "../../assets/textures/";
    var file = pre + envMaps[index].file; 
    console.log(index, file);    //var file = pre + "block_test1.jpg"
    var size = 1024;
    loader.load(file, function (image) {        

        var getSide = function (x, y) {

            var canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            var context = canvas.getContext('2d');
            context.drawImage(image, -x * size, -y * size);

            return canvas;

        };

        cubeMap.image[ 0 ] = getSide(2, 1); // px
        cubeMap.image[ 1 ] = getSide(0, 1); // nx
        cubeMap.image[ 2 ] = getSide(1, 0); // py
        cubeMap.image[ 3 ] = getSide(1, 2); // ny
        cubeMap.image[ 4 ] = getSide(1, 1); // pz
        cubeMap.image[ 5 ] = getSide(3, 1); // nz
        cubeMap.needsUpdate = true;

    });

    return cubeMap;
}

/*
 * 

    var geom = new THREE.Geometry()
    for (var i = 0; i < ship.children.length; i++) {
        ship.children[i].updateMatrix();
        geom.merge(ship.children[i].geometry, ship.children[i].matrix);
    }
    ship = new THREE.Mesh(geom, mat);
 
 * 
 */

/*
 * 
 
    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = getCubeMap(10);

    var skyBoxMaterial = new THREE.ShaderMaterial({
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    var skyBox = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100),skyBoxMaterial);

    scene.add(skyBox);
 
 *  
 */

/*
 * 
 
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 0, 0 );
    scene.add( hemiLight );
 
 * 
 */
var main = (function() {

    var main = function(vert, frag, color_name){
        if(!(this instanceof main)) {
            return new main();
        }
        this.vert = vert;
        this.frag = frag;
        this.color_name = color_name;
        this.rainbow_color = null;
        this.volume = new KVS.LobsterData();
        var screen = new KVS.THREEScreen();

        screen.init(this.volume, {
        width: window.innerWidth * 0.6,
        height: window.innerHeight,
        targetDom: document.getElementById('display'), enableAutoResize: false
        });
        
        var bounds = Bounds( this.volume );
        screen.scene.add( bounds );

        this.isovalue = 128;//parseInt(iso*255);
        this.surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name);
        screen.scene.add( this.surfaces );
        

        document.addEventListener( 'mousemove', function() {
          screen.light.position.copy( screen.camera.position );
        });

        window.addEventListener('resize', function() {
          screen.resize([ window.innerWidth * 0.6, window.innerHeight ]);
        });
        

        var renderer;
        
        canvas = document.getElementById('display2');
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth * 0.08, window.innerHeight); 
        renderer.autoClear = false;
        canvas.appendChild(renderer.domElement); 
        
        var scene2 = new THREE.Scene();
        
        var fov = 45;
        var aspect = canvas.clientWidth / canvas.clientHeight;
        var near = 1;
        var far = 1000;
        var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
        camera.position.set( 0, 0, 6 );
        scene2.add( camera );
        var light = new THREE.PointLight();
        light.position.set( 5, 5, 5 );
        scene2.add( light );
        
        var geometry = new THREE.PlaneGeometry(30, 30);
        var material = this.surfaces.material;
        this.mesh = new THREE.Mesh( geometry, material );
        
        scene2.add(this.mesh);
        
        screen.loop();
        
        loop();
        
        function loop()
        {
          requestAnimationFrame( loop );
          renderer.render( scene2, camera );
        }
    }
    
    var change_surfaces = main.prototype;
    
    // プロトタイプ内でメソッドを定義
    
    change_surfaces.setVolume = function(volume){
        this.volume = volume;
    }
    
    change_surfaces.setMesh = function(surfaces){
        this.surfaces = surfaces;
    }
    
    change_surfaces.set_surfaces = function( value ) {
        this.isovalue = parseInt(value*255)
        var surfaces = Isosurfaces( this.volume, this.isovalue , this.vert, this.frag, this.color_name, this.rainbow_color );
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_shader = function( vert, frag ){
        this.vert = vert;
        this.frag = frag;
        var surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name, this.rainbow_color );
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_color = function( color_name ){
        this.color_name = color_name;
        this.rainbow_color = null;
        var surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name, this.rainbow_color);
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_any_color = function( red_value , green_value , blue_value ){
        this.rainbow_color = new THREE.Color( red_value, green_value, blue_value);
        var surfaces = Isosurfaces( this.volume, this.isovalue, this.vert, this.frag, this.color_name, this.rainbow_color );
        this.surfaces.material = surfaces.material;
    }
    
    change_surfaces.set_plane_color = function(isovalue){
        var material = calculate_material(isovalue, this.vert, this.frag, this.color_name, this.rainbow_color);
        this.mesh.material = material;
    }
    
    change_surfaces.set_plane_any_color = function(red_value , green_value , blue_value){
        rainbow_color = new THREE.Color( red_value, green_value, blue_value);
        var material = calculate_material(this.isovalue, this.vert, this.frag, this.color_name, rainbow_color);
        this.mesh.material = material;
    }
    
    change_surfaces.update_plane_color = function(){
        var material = calculate_material(this.isovalue, this.vert, this.frag, this.color_name, this.rainbow_color);
        this.mesh.material = material;
    }
    
    return main;
})();

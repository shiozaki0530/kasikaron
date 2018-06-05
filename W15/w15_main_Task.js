function main(change_isovalue, vert, frag)
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init(volume, {
	width: window.innerWidth * 0.8,
	height: window.innerHeight,
	targetDom: document.getElementById('display'), enableAutoResize: false
    });
	
    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = 128;//parseInt(iso*255);
    var surfaces = Isosurfaces( volume, isovalue, vert, frag);
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener('resize', function() {
	screen.resize([ window.innerWidth * 0.8, window.innerHeight ]);
    });
    
    change_isovalue.setVolume(volume);
    change_isovalue.setMesh(surfaces);

    screen.loop();
    
}
var change_isovalue = (function() {

    var change_isovalue = function(vert, frag){
        if(!(this instanceof change_isovalue)) {
            return new change_isovalue();
        }
        this.vert = vert;
	this.frag = frag;
    }
    
    this.volume = null
    this.mesh = null;
    
    var change_surfaces = change_isovalue.prototype
    
    // プロトタイプ内でメソッドを定義
    
    change_surfaces.setVolume = function(volume){
        this.volume = volume;
    }
    
    change_surfaces.setMesh = function(mesh){
        this.mesh = mesh;
    }
    
    change_surfaces.set_surfaces = function( value ) {
        var surfaces = Isosurfaces( this.volume, parseInt(value*255), this.vert, this.frag);
        this.mesh.material = surfaces.material;
    }
    
    change_surfaces.set_shader = function( vert, frag ){
        this.vert = vert;
	this.frag = frag;
	var surfaces = Isosurfaces( this.volume, parseInt(value*255), this.vert, this.frag);
	this.mesh.material = surfaces.material;
    }
    return change_isovalue;
})();



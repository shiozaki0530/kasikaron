function calculate_material(isovalue, vert_name, frag_name, color_name, rainbow_color)
{
    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );

    if (rainbow_color==null){
      if(color_name=="red"){
        // Create color map
        var cmap = [];
        for ( var i = 0; i < 256; i++ )
        {
          var S = i / 255.0; // [0,1]
          var R = 1.0;
          var G = 1.0 - S;
          var B = 1.0 - S;
          var color = new THREE.Color( R, G, B );
          cmap.push( [ S, '0x' + color.getHexString() ] );
        }
      }else if(color_name == "green"){
        // Create color map
        var cmap = [];
        for ( var i = 0; i < 256; i++ )
        {
          var S = i / 255.0; // [0,1]
          var R = 1.0 - S;
          var G = 1.0;
          var B = 1.0 - S;
          var color = new THREE.Color( R, G, B );
          cmap.push( [ S, '0x' + color.getHexString() ] );
        }
      }else if(color_name == "blue"){
        // Create color map
        var cmap = [];
        for ( var i = 0; i < 256; i++ )
        {
          var S = i / 255.0; // [0,1]
          var R = 1.0 - S;
          var G = 1.0 - S;
          var B = 1.0;
          var color = new THREE.Color( R, G, B );
          cmap.push( [ S, '0x' + color.getHexString() ] );
        }
      }
      var C = new THREE.Color().setHex( cmap[ isovalue ][1] );
      COLOR = new THREE.Color( C );
    }else{
      COLOR = rainbow_color;
    }
    
    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById(vert_name).text,
        fragmentShader: document.getElementById(frag_name).text,
        uniforms: {
            light_position: { type: 'v3', value: light.position },
            C_color: { type:'v3', value: COLOR }
        }
    });

    return material;
}


module.exports = (req, res) => {
  var zombiePos = [];

  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  
  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
               new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
               new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

  var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  // To remove the need for index wrapping, double the permutation table length
  var perm = new Array(512);
  var gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  var seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };
  var rand = Math.random();
  seed(rand * 255);

  
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  var perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };
  var arrays = [];
  const making = () => {
    var coord = 0;
    for (var y = 0; y < 6400; y +=64) for (var x = 0; x < 6400; x +=64) {
        var perlinValue = (perlin2(x/100,y/100));
        if (y == 768 - 32 && x == 320 - 32) perlinValue = 0;
        else if (y == 768 + 32 && x == 320 + 32) perlinValue = 0;
        if (perlinValue < 0.23) {
          coord = 0;
        }
        else if (perlinValue >= 0.23) {
          coord = 69;
        }
        let Y  = y / 64, X = x / 64;
        if (Y > 51 && Y < 58) coord = 0;
        else if (X > 44 && X < 52) {
            if (Y < 52) coord = 0;
        }
        else if ( X > 10 && X < 19 ||  X > 81 && X < 90) {
            if ( Y > 58) coord = 0;
        }
        arrays.push(coord);
    }
  }
  const createZombie = () =>{
    let zombie = Math.floor(rand * 10);
    if (!zombie) zombie = 2;
    let id = 1;
    let logY = logX = [];
    while (zombie > 0) {
      let X = Math.floor(Math.random() * 6400);
      let Y = Math.floor(Math.random() * 6400);
      let key = Math.floor(Y / 64) * 100 + Math.floor( X / 64 );
      if (logY[Math.floor(Y / 64)] && logX[Math.floor( X / 64 )]) continue;
      if (!arrays[key]) {
        logY[Math.floor(Y / 64)] = logX[Math.floor( X / 64 )] = 1;
        let item = {
          "height":0,
          "id": id,
          "name":"player"+id,
          "point":true,
          "rotation":0,
          "type":"",
          "visible":true,
          "width":0
        };
        item['x'] = X; item['y'] = Y; zombie --;
        zombiePos.push(item); id ++;
      }
    }
    return ;
  }
  making();
  createZombie();
  res.setHeader('Access-Control-Allow-Origin', '*');
  var maps = require('./map.json');
  maps.layers[3].data = arrays;
  maps.layers[2].objects = zombiePos;
  return maps;
}
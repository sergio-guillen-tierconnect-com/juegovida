/* Logic for Conway's life game */
function Conway(rows, columns) {
   var getArray = function(r,c) {
      v = new Array(r);
      for(i = 0; i<r; ++i) {
         v[i] = new Array(c);
         for(j = 0; j<c; ++j) {
            v[i][j] = false;
         }
      }
      return v;
   };

   this.rows = rows;
   this.columns = columns;
   this.rr = [-1,-1,-1,0,1,1, 1,0];
   this.cc = [-1, 0, 1,1,1,0,-1,-1];
   this.m = getArray(rows, columns);
   this.tmp = getArray(rows, columns);
}
Conway.prototype.isValid = function(i,j) {
   if(0 <= i && i < this.rows && 0 <= j && j < this.columns) {
      return true;
   }
   return false;
}
Conway.prototype.get = function(i, j) {
   if(this.isValid(i,j)) {
      return this.m[i][j];
   } else {
      return -1;
   }
}
Conway.prototype.set = function(i,j,value) {
   if(this.isValid(i,j)) {
      this.m[i][j] = value;
   }
}
/**
Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

Conway.prototype.nextStage = function() {
   var lifeNeighbours = 0;
   for(i = 0; i<this.rows; ++i) {
      for(j = 0; j<this.columns; ++j) {
         lifeNeighbours = 0;
         for(k = 0; k<8; ++k) {
            if(this.isValid(i+this.rr[k], j+this.cc[k])) {
               if(this.m[i+this.rr[k]][j+this.cc[k]]) {
                  lifeNeighbours++;
               }
            }
         }

         if(this.m[i][j]) {
            if(lifeNeighbours < 2) {
               this.tmp[i][j] = false;
            } else if(lifeNeighbours == 2 || lifeNeighbours == 3) {
               this.tmp[i][j] = true;
            } else if(lifeNeighbours > 3) {
               this.tmp[i][j] = false;
            }
         } else {
            if(lifeNeighbours == 3) {
               this.tmp[i][j] = true;
            }
         }
      }
   }
   this.copyMatrix();
}
Conway.prototype.copyMatrix = function() {
   for(i = 0; i<this.rows; ++i) {
      for(j = 0; j<this.columns; ++j) {
         this.m[i][j] = this.tmp[i][j];
         this.tmp[i][j] = false;
      }
   }
}
Conway.prototype.toString = function(f,c) {
   var result = '';
   for(i = 0; i<f; ++i) {
      for(j = 0; j<c; ++j) {
         if(this.m[i][j]) {
            result += '#';
         } else  {
            result += '_';
         }
      }
      result += '<br />';
   }
   return result;
}

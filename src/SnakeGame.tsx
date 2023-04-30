enum Direction {
    Up,
    Down,
    Left,
    Right,
  }
  
  class SnakeGame {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly tileSize: number = 20;
    private readonly width: number;
    private readonly height: number;
    private readonly numTilesX: number;
    private readonly numTilesY: number;
    private snake: number[][];
    private direction: Direction;
    private food: number[];
  
    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      const context = canvas.getContext("2d");
    if (context === null) {
      throw new Error("Could not initialize canvas context.");
    }
      this.ctx = context;
      this.snake = [[5, 5]]; // initialize snake with starting position
      this.direction = Direction.Right;
      this.food = this.generateFood();  
      this.width = canvas.width;
      this.height = canvas.height;
      this.numTilesX = Math.floor(this.width / this.tileSize);
      this.numTilesY = Math.floor(this.height / this.tileSize);
      this.reset();
    }
  
    private reset(): void {
      this.snake = [[this.numTilesX / 2, this.numTilesY / 2]];
      this.direction = Direction.Up;
      this.food = this.generateFood();
    }
  
    private generateFood(): number[] {
      let x = Math.floor(Math.random() * this.numTilesX);
      let y = Math.floor(Math.random() * this.numTilesY);
      return [x, y];
    }
  
    private drawTile(x: number, y: number, color: string): void {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(
        x * this.tileSize,
        y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }
  
    private drawSnake(): void {
      for (const [x, y] of this.snake) {
        this.drawTile(x, y, "green");
      }
    }
  
    private moveSnake(): void {
      let [headX, headY] = this.snake[0];
      switch (this.direction) {
        case Direction.Up:
          headY--;
          break;
        case Direction.Down:
          headY++;
          break;
        case Direction.Left:
          headX--;
          break;
        case Direction.Right:
          headX++;
          break;
      }
      this.snake.unshift([headX, headY]);
      if (headX === this.food[0] && headY === this.food[1]) {
        this.food = this.generateFood();
      } else {
        this.snake.pop();
      }
    }
  
    private checkCollisions(): boolean {
      let [headX, headY] = this.snake[0];
      if (headX < 0 || headX >= this.numTilesX || headY < 0 || headY >= this.numTilesY) {
        return true; // hit wall
      }
      for (let i = 1; i < this.snake.length; i++) {
        if (headX === this.snake[i][0] && headY === this.snake[i][1]) {
          return true; // hit self
        }
      }
      return false;
    }
  
    private drawFood(): void {
      this.drawTile(this.food[0], this.food[1], "red");
    }
  
    private draw(): void {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawSnake();
      this.drawFood();
    }
  
    public start(): void {
      this.reset();
      let interval = setInterval(() => {
        if (this.checkCollisions()) {
          clearInterval(interval);
          alert(`Game over! You scored ${this.snake.length - 1} points.`);
        } else {
          this.moveSnake();
          this.draw();
        }
    }, 100);
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (this.direction !== Direction.Down) {
            this.direction = Direction.Up;
          }
          break;
        case "ArrowDown":
          if (this.direction !== Direction.Up) {
            this.direction = Direction.Down;
          }
          break;
        case "ArrowLeft":
          if (this.direction !== Direction.Right) {
            this.direction = Direction.Left;
          }
          break;
        case "ArrowRight":
          if (this.direction !== Direction.Left) {
            this.direction = Direction.Right;
          }
          break;
      }
    });
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const game = new SnakeGame(canvas);
game.start();

      
       
  
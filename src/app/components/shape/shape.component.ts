import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Shape } from '../../models/shape.model';
import { ShapesService } from "../../services/shapes.service"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements AfterViewInit {

  @ViewChild('canvas') canvasRef!: ElementRef;
  private context!: CanvasRenderingContext2D;
  public form: FormGroup;
  userInput: string = "";


  constructor(private shapesService: ShapesService,
    private fb: FormBuilder) {

    this.form = this.fb.group({
      userText: ['', [Validators.required]]
    });
  }


  ngOnInit() {
  }

  get userText() {
    return this.form.get('userText')?.value;
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');
  }

  //Test Sending User Input to the API POST:
  sendUserInput() {
    this.userInput = this.form.get('userText')?.value;

    this.shapesService.sendUserInputAPI(this.userInput)
      .subscribe(response => {

        if (response.name == "circle") {
          this.drawCircle(response.radius);
        }

        if (response.name == "square") {
          this.drawSquare(response.length);
        }

        if (response.name == "rectangle") {
          this.drawRectangule(response.width, response.height);
        }

        if (response.name == "triangle") {
          this.drawIsoscelesTriangle(response.width, response.height);
        }

        if (response.name == "octagon") {
          this.drawOctagon(response.length);
        }

      });

  }


  //Drawing methods:

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  drawCircle(radius: number): void {

    this.clearCanvas();
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.arc(100, 100, radius, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
  }


  drawSquare(length: number) {

    this.clearCanvas();
    this.context.fillStyle = 'blue';
    this.context.fillRect(40, 0, length, length);
  }


  drawRectangule(width: number, height: number) {

    this.clearCanvas();
    this.context.fillStyle = 'green';
    this.context.fillRect(30, 10, width, height);
  }


  drawTriangle(length: number) {

    this.clearCanvas();
    const x = 100;
    const y = 100;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x + length, y);
    this.context.lineTo(x + length / 2, y - Math.sqrt(3) / 2 * length);
    this.context.closePath();
    this.context.fillStyle = '#FF0000';
    this.context.fill();
  }


  drawOctagon(length: number) {

    this.clearCanvas();
    const centerX = this.canvasRef.nativeElement.width / 2;
    const centerY = this.canvasRef.nativeElement.height / 2;
    this.context.fillStyle = 'brown';
    this.context.beginPath();
    this.context.moveTo(centerX + length, centerY);
    for (let i = 1; i <= 7; i++) {
      const angle = i * 2 * Math.PI / 8;
      const x = centerX + length * Math.cos(angle);
      const y = centerY + length * Math.sin(angle);
      this.context.lineTo(x, y);
    }
    this.context.closePath();
    this.context.fill();
  }



  drawIsoscelesTriangle(width: number, height: number): void {

    this.clearCanvas();
    const x = 50;
    const y = 120;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x + width, y);
    this.context.lineTo(x + width / 2, y - height);
    this.context.closePath();
    this.context.fillStyle = 'orange';
    this.context.fill();
  }



}

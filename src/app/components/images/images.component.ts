import {Component, OnInit} from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  selectedFile: File;
  message: string;
  imageName: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(public imageService: ImageService) {
  }

  ngOnInit() {
  }

  // Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.imageService.onUpload(uploadImageData).subscribe(
      response => {
        this.message = "Image uploaded ......"
        console.log(this.message)
      },
      error => {
        this.message = " Image not uploaded successfully : "
        console.log(this.message)
      },
      () => {
        this.message = " Image uploaded successfully.........."
        console.log(this.message)
      }
    );

  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImageInBD() {
    this.imageService.getImageInBD(this.imageName).subscribe(
      response => {
        this.retrieveResonse = response;
        //console.log("retrieveResonse: "+this.retrieveResonse);
        this.base64Data = this.retrieveResonse.picByte;
        //console.log("base64Data: "+this.base64Data);
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        //console.log("retrievedImage: "+this.retrievedImage);
      },
      error => {
        this.message = " Error Operation!!!! "
        console.log(error.toString());
      },
      () => {
        this.message = " Succeful Operation!!!! "
      }
    );

  }

  getImageInDirectory() {
    this.retrievedImage = this.imageService.getImageInDirectory(this.imageName)
    //this.imageService.getImageInDirectory(this.imageName)
  }
}

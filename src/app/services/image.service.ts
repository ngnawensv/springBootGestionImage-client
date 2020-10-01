import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public host: string = 'http://localhost:8080';

  constructor(private  httpClient: HttpClient) {
  }

  //Make a call to the Spring Boot Application to save the image
  onUpload(uploadImageData) {
    return this.httpClient.post(this.host+"/image/upload", uploadImageData);

  }

  getImage(imageName) {
    return this.httpClient.get(this.host+"/image/get/" + imageName);

  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { List } from '../data-type';
import { UserService } from '../user.service';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrl: './image-capture.component.css'
})
export class ImageCaptureComponent {

  uploadMessage = '';
  imagePreview: string | ArrayBuffer | null = null;

  selectedFile: File | null = null;
  constructor(private http: HttpClient, private userService: UserService) { }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // uploadImage() {
  //   if (!this.selectedFile) {
  //     this.uploadMessage = 'No file selected!';
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('image', this.selectedFile);

  //   this.http.post('http://localhost:3000/upload', formData).subscribe(
  //     (response) => {
  //       this.uploadMessage = 'Upload successful!';
  //     },
  //     (error) => {
  //       this.uploadMessage = 'Upload failed!';
  //     }
  //   );
  // }

  // OnUpload(data : List){
  //    console.log(data);
  //    this.service.insertQp(data);


  // }

  OnUpload(data: List) {
    const myData = { image: data.image, sem: data.sem, year: data.year };

    this.userService.insertQp(myData).subscribe(
      response => {
        console.log('Data posted successfully:', response);
      },
      error => {
        console.error('Error posting data:', error);
      }
    );
  }
}

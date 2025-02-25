import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrl: './image-capture.component.css'
})
export class ImageCaptureComponent {

  uploadMessage = '';
  imagePreview  :  string | ArrayBuffer | null = null;

  selectedFile : File | null = null;
  constructor(private http: HttpClient) {}

  onFileSelected(event : Event){
   const fileInput = event.target as HTMLInputElement;
   if(fileInput.files && fileInput.files.length > 0){
     this.selectedFile = fileInput.files[0];

     const reader = new FileReader();
     reader.onload = () => {
      this.imagePreview = reader.result;
     };
     reader.readAsDataURL(this.selectedFile);
   }
  }

  uploadImage() {
    if (!this.selectedFile) {
      this.uploadMessage = 'No file selected!';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost:3000/upload', formData).subscribe(
      (response) => {
        this.uploadMessage = 'Upload successful!';
      },
      (error) => {
        this.uploadMessage = 'Upload failed!';
      }
    );
  }
}

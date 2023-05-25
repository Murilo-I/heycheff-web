import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export class MediaService{
  constructor(private HttpClient:HttpClient){}

  getMedia(path:string){
    let param = new HttpParams().set('path', path);
    return this.HttpClient.get<File>(environment.ApiUrl + '/media', {params: param})
  }

}

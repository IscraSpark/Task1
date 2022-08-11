import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { UserForAdmin } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DownloadcsvService {
  constructor() {}

  save(headers: string[], data: UserForAdmin[]) {
    if (!data.length) {
      return;
    }
    const separator = ';';
    let content =
      headers.join(separator) +
      '\n' +
      data.map((rowData: any) => {
        return headers
          .map((headKey) => {
            return rowData[headKey.toLowerCase().replace(' ', '_')] === null ||
              rowData[headKey.toLowerCase().replace(' ', '_')] === undefined
              ? ''
              : rowData[headKey.toLowerCase().replace(' ', '_')];
          })
          .join(separator);
      });
    for (; content.includes(',U'); ) {
      // move to next line for next user
      content = content.replace(',U', '\nU');
    }

    this.exportFile(content, 'text/csv');
  }

  exportFile(data: string, fileType: string) {
    const blob = new Blob([data], { type: fileType });

    saveAs(blob, 'users.csv');
  }
}

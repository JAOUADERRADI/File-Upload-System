# File Upload System

This system allows users to upload files through a drag-and-drop interface or by browsing files from their device. It displays the upload progress and allows users to cancel uploads if necessary.

## Features

1. **Drag-and-Drop Interface**: Users can drag files into a designated area to upload them.
2. **File Browsing**: Users can click a button to open a file browser and select files to upload.
3. **Progress Tracking**: Displays the upload progress of each file.
4. **Cancel Upload**: Users can cancel an ongoing upload.
5. **Completion Status**: Shows the number of completed file uploads.

## HTML Structure

```html
<div class="file-uploader">
  <header class="uploader-header">
    <h2 class="uploader-title">File Uploader</h2>
    <h4 class="file-completed-status"></h4>
  </header>
  <ul class="file-list"></ul>
  <div class="file-upload-box">
    <h2 class="box-title">
      <span class="file-instruction">Drag files here or</span>
      <span class="file-browse-button">browse</span>
    </h2>
    <input type="file" class="file-browse-input" multiple hidden />
  </div>
</div>
```

## JavaScript Overview

### Variables

- fileList: The HTML element where the list of files is displayed.
- fileBrowseButton: The button to open the file browser.
- fileBrowseInput: The hidden input field for file selection.
- fileUploadBox: The box where users can drag and drop files.
- fileCompletedStatus: The element displaying the count of completed files.
- totalFiles: Total number of files selected for upload.
- completedFiles: Number of files that have been successfully uploaded.

### Fonctions

#### `createFileHTML(file, uniqueIdentifier)`

Generates the HTML structure for a file item.

- **Paramètres**:
  - `file`: The file object.
  - `uniqueIdentifier`: A unique identifier for the file item.
- **Returns**: A string of HTML.

#### `handleFileUploading(file, uniqueIdentifier)`

Handles the file upload process using `XMLHttpRequest`.

- **Paramètres**:
  - `file`: The file object.
  - `uniqueIdentifier`: A unique identifier for the file item.
- **Returns**: The `XMLHttpRequest` object.

#### `handleSelectedFiles(files)`

Handles the selection of files, including creating the file item HTML and initiating the upload.

- **Paramètres**:
  - `files`: An array of file objects.

### Events Listeners

- **Drag and Drop Events**:

  - `drop`: Handles files dropped into the upload box.
  - `dragover`: Handles the dragover event to indicate that files can be dropped.
  - `dragleave`: Handles the dragleave event to revert the upload box style.

- **File Browsing Events**:
  - `change`: Triggered when files are selected through the file browser.
  - `click`: Opens the file browser when the browse button is clicked.

## Usage

1. **Drag-and-Drop**: Drag files into the upload box and drop them to start the upload.
2. **Browse Files**: Click the "Browse" button to open the file browser and select files.

## Notes

- Ensure the server-side endpoint api.php is correctly set up to handle file uploads.
- Modify the file.size display logic in handleFileUploading if you want a different unit conversion.

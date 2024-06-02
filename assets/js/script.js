const fileList = document.querySelector(".file-list");

const fileBrowseButton = document.querySelector(".file-browse-button");
const fileBrowseInput = document.querySelector(".file-browse-input");
const fileUploadBox = document.querySelector(".file-upload-box");
const fileCompletedStatus = document.querySelector(".file-completed-status");

let totalFiles = 0;
let completedFiles = 0;

const createFileHTML = (file, uniqueIdentifier) => {
  // Extracting file name, size & extension
  const { name, size } = file;
  const extension = name.split(".").pop();
  console.log(name, extension, size);

  // Generate HTML for file item
  return `<li class="file-item" id="file-item-${uniqueIdentifier}">
            <div class="file-extension">${extension}</div>
                <div class="file-content-wrapper">
                    <div class="file-content">
                        <div class="file-details">
                            <h5 class="file-name">${name}</h5>
                            <div class="file-info">
                                <small class="file-size">4 MB / ${size}</small>
                                <small class="file-divider">.</small>
                                <small class="file-status">Uploading...</small>
                            </div>
                        </div>
                        <button class="cancel-button"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="file-progress-bar">
                        <div class="file-progress">
                    </div>
                </div>
            </div>
        </li>`;
};

//  Function to handle file uploading
const handleFileUploading = (file, uniqueIdentifier) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append("file", file);

  xhr.upload.addEventListener("progress", (e) => {
    // console.log(e);
    // Updating progress bar and file size element
    const fileProgress = document.querySelector(
      `#file-item-${uniqueIdentifier} .file-progress`
    );
    const fileSize = document.querySelector(
      `#file-item-${uniqueIdentifier} .file-size`
    );

    // Formatting the uploading or total file size into KB or MB accordingly
    const formattedFileSize =
      file.size >= 1024 * 1024
        ? `${(e.loaded / 1024 / 1024).toFixed(2)} MB`
        : `${(e.loaded / 1024).toFixed(2)} KB`;
    const progress = Math.round((e.loaded / e.total) * 100);

    fileProgress.style.width = `${progress}%`;
    fileSize.innerText = formattedFileSize;
  });

  //    Opening connection to the server API endpoint "api.php" and sending the form data
  xhr.open("POST", "api.php", true);
  xhr.send(formData);

  return xhr;
};

//  Function to handle selected files
const handleSelectedFiles = ([...files]) => {
  //    console.log(files);
  if (files.length === 0) return; //Check if no files are selected

  totalFiles += files.length;

  files.forEach((file, index) => {
    const uniqueIdentifier = Date.now() + index;
    const fileItemHTML = createFileHTML(file, uniqueIdentifier);
    //  Insert each file item into file list
    fileList.insertAdjacentHTML("afterbegin", fileItemHTML);
    const currentFileItem = document.querySelector(
      `#file-item-${uniqueIdentifier}`
    );

    const cancelFileUploadButton =
      currentFileItem.querySelector(".cancel-button");

    const xhr = handleFileUploading(file, uniqueIdentifier);

    xhr.addEventListener("readystatechange", () => {
      //  Handling completion of file upload
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        completedFiles++;

        cancelFileUploadButton.remove();

        currentFileItem.querySelector(".file-status").innerText = "Completed";
        currentFileItem.querySelector(".file-status").style.color = "#00B125";
        fileCompletedStatus.innerText = `${completedFiles} / ${totalFiles} file completed`;
      }
    });
    // Handling cancellation of file upload
    cancelFileUploadButton.addEventListener("click", () => {
      xhr.abort(); // cancel file upload
      currentFileItem.querySelector(".file-status").innerText = "Cancelled";
      currentFileItem.querySelector(".file-status").style.color = "#E3413F";
      cancelFileUploadButton.remove();
    });

    // Show alert if ther is any error occured during file uploading
    xhr.addEventListener("error", () => {
      alert("An error occurred during the file upload !");
    });
  });
  fileCompletedStatus.innerText = `${completedFiles} / ${totalFiles} file completed`;
};

//  Function to handle drop event
fileUploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  handleSelectedFiles(e.dataTransfer.files);
  //    console.log("Drag Leave");
  fileUploadBox.classList.remove("active");
  fileUploadBox.querySelector(".file-instruction").innerHTML =
    "Drag files here or";
});

//  Function to handle dragover event
fileUploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  //    console.log("Drag Over");
  fileUploadBox.classList.add("active");
  fileUploadBox.querySelector(".file-instruction").innerHTML =
    "Release to upload or";
});

//  Function to handle dragleave event
fileUploadBox.addEventListener("dragleave", (e) => {
  e.preventDefault();
  //    console.log("Drag Leave");
  fileUploadBox.classList.remove("active");
  fileUploadBox.querySelector(".file-instruction").innerHTML =
    "Drag files here or";
});

fileBrowseInput.addEventListener("change", (e) =>
  handleSelectedFiles(e.target.files)
);
fileBrowseButton.addEventListener("click", () => fileBrowseInput.click());

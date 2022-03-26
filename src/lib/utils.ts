/* eslint-disable import/prefer-default-export */
export const downloadBlobAsFile = function (
  data: any,
  filename = "backup.txt",
): void {
  const contentType = "application/octet-stream";

  if (!data) {
    console.error(" No data");
    return;
  }

  let dataToBlob = data;

  if (typeof dataToBlob === "object") {
    dataToBlob = JSON.stringify(data, undefined, 4);
  }

  const blob = new Blob([dataToBlob], { type: contentType });
  const a = document.createElement("a");

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = [contentType, a.download, a.href].join(":");
  a.click();
};

export const uniformKeyFormat = (key)=>{
  key = key.replace(/\n+/g,'');
  return key
}

const openDownloadDialog = (url, fileName) => {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url);
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = fileName;
  aLink.click();
};

 export const download = (content)=>{
   var blob = new Blob(['\ufeff' + content], {type: 'application/json,charset=UTF-8'});
   openDownloadDialog(blob,`${new Date().toISOString()}.json`);
 }

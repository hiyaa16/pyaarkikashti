// src/CloudinaryUpload.js
function CloudinaryUpload() {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'pyaarkikashti'); // your preset name

    const cloudName = "dhkabclgt"; // your cloud name

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    alert("Uploaded at " + result.secure_url);
    // You can use result.secure_url for your gallery etc.
  };

  return (
    <form>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </form>
  );
}

export default CloudinaryUpload;

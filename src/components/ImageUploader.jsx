import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useRef, useState } from "react";

const ImageUploader = ({
  accept,
  label = "Upload Image: ",
  children,
  className,
  setData,
}) => {
  const [progress, setProgress] = useState(0);

  const [uploadedImage, setUploadedImage] = useState(null);

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  /**
   * Authenticates and retrieves the necessary upload credentials from the server.
   *
   * This function calls the authentication API endpoint to receive upload parameters like signature,
   * expire time, token, and publicKey.
   *
   * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
   * @throws {Error} Throws an error if the authentication request fails.
   */

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/upload-auth`
      );

      console.log(
        `fETCHING FROM : ${import.meta.env.VITE_API_URL}/posts/upload-auth`
      );
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */
  const handleUpload = async (file) => {
    if (!file) return;

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });

      console.log(uploadResponse);

      // Update Thumbnail Image for particular selected image
      setUploadedImage(uploadResponse.url);

      // After each successful upload, call the setData callback,
      // which in turn calls handleImageUpload to add the image URL to the array

      if (setData) {
        setData(uploadResponse);
      }
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleUpload(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full flex items-center justify-between">
      {/* File input */}
      <div className="flex w-3/4 items-center gap-4">
        <label htmlFor="">{label}</label>
        <input
          type="file"
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Custom Upload Button */}
        <button
          type="button"
          onClick={triggerFileInput}
          className="px-2 py-1 bg-primary text-white rounded"
        >
          Choose File
        </button>
      </div>

      {}
      {/* Progress bar */}
      {uploadedImage && (
        <div className="flex w-full justify-end gap-4 items-center">
          <progress
            value={progress}
            max={100}
            className={`w-36 ${className}`}
          ></progress>

          {/* Thumbnail */}
          <div className="thumbnails-container flex ">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded thumbnail"
                className={`w-8 h-8 object-contain ${className}`}
              />
            ) : (
              <div className="w-8 h-8"></div>
            )}
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default ImageUploader;

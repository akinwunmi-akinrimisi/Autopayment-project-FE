import React, { useState, useCallback, useEffect } from "react";

function Input({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error: propError,
  disabled,
  readOnly,
  accept, // For file types
  multiple = false, // For file inputs
  placeholder,
  isTextArea = false,
  rows = 4, // Default rows for textarea
  containerClassName = "",
  buttonClassName = "", // Custom styles for the file upload button
  labelClassName = "", // Custom styles for the label
  pattern,
  ...props
}) {
  const [localError, setLocalError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]); // For file input
  const displayError = propError || localError;

  const validateInput = useCallback(() => {
    let err = "";

    if (type === "file") {
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          // Check file type if accept attribute is provided
          if (accept && !accept.split(",").includes(file.type)) {
            err = `Invalid file type: ${file.name}`;
            break;
          }
          // Check file size (example: max 2MB)
          if (file.size > 2 * 1024 * 1024) {
            err = `File size must not exceed 2MB: ${file.name}`;
            break;
          }
        }
      }
    } else if (pattern && value) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        err = "Invalid format";
      }
    }

    setLocalError(err);
  }, [type, value, pattern, selectedFiles, accept]);

  useEffect(() => {
    validateInput(); // Validate input whenever dependencies change
  }, [localError, propError, validateInput]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files); // Update selected files
    onChange && onChange(files.length > 0 ? files[0] : null); // Pass the first file to the parent handler
  };

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}

      {type === "file" ? (
        <>
          {/* Custom button for file upload */}
          <div className={`relative ${buttonClassName}`}>
            <button
              type="button"
              className={`w-full text-left px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white hover:bg-gray-100 disabled:opacity-50 ${
                displayError ? "border-red-400" : "border-gray-300"
              }`}
              disabled={disabled}
              onClick={() => document.getElementById(id).click()}
            >
              {selectedFiles.length > 0
                ? `${selectedFiles.length} file(s) selected`
                : "Upload File(s)"}
            </button>
            <input
              id={id}
              name={name}
              type="file"
              multiple={multiple}
              accept={accept}
              onChange={handleFileChange}
              className="hidden" // Hide the actual file input
              disabled={disabled}
              {...props}
            />
          </div>
          {selectedFiles.length > 0 && (
            <ul className="text-xs text-gray-600 mt-1">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </>
      ) : isTextArea ? (
        // Render textarea if isTextArea is true
        <textarea
          id={id}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder ?? ""}
          disabled={disabled}
          rows={rows}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
            disabled ? "bg-neutral-100" : "bg-white"
          } ${displayError ? "border-red-400" : "border-gray-300"}`}
          {...props}
        />
      ) : (
        // Default input for other types
        <input
          id={id}
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder ?? ""}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
            disabled ? "bg-neutral-100" : "bg-white"
          } ${displayError ? "border-red-400" : "border-gray-300"}`}
          {...props}
        />
      )}

      {displayError && <p className="text-xs text-red-400 mt-1">{displayError}</p>}
    </div>
  );
}

export default Input;
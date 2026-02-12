import React from "react";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  resultText: string; // <-- This will contain: "My BMI is 22.4 (Normal)"
};

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  resultText,
}) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const fullMessage = `${resultText} \n\nCheck yours here: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMessage);
    alert("Copied to clipboard!");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "BMI Result",
          text: fullMessage,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      alert("Sharing not supported on this device");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-center">
          Share Your Result
        </h2>

        <div className="space-y-3">

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(fullMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-500 text-white py-2 px-4 rounded text-center"
          >
            Share on WhatsApp
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=BMI Result&body=${encodeURIComponent(fullMessage)}`}
            className="block bg-blue-500 text-white py-2 px-4 rounded text-center"
          >
            Share via Email
          </a>

          {/* Native Share (Mobile) */}
          <button
            onClick={handleNativeShare}
            className="w-full bg-purple-500 text-white py-2 rounded"
          >
            More Options
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="w-full bg-gray-600 text-white py-2 rounded"
          >
            Copy Result
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full mt-2 text-red-500 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

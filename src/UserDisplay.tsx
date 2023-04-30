import React from "react";

interface CombinedCodeProps {
  typescriptCode: string;
  htmlCode: string;
  cssCode: string;
}

const UserDisplay: React.FC<CombinedCodeProps> = ({
  typescriptCode,
  htmlCode,
  cssCode,
}) => {
  const combinedCode = `
    <style>${cssCode}</style>
    ${htmlCode}
    <script>${typescriptCode}</script>
  `;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "lightgrey",
      }}
      dangerouslySetInnerHTML={{ __html: combinedCode }}
    />
  );
};

export default UserDisplay;
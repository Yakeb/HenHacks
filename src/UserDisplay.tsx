import React, { useState, useEffect } from "react";

interface CombinedCodeProps {
  htmlCode: string;
  cssCode: string;
}

const UserDisplay: React.FC<CombinedCodeProps> = ({
  htmlCode,
  cssCode,
}) => {
  const [combinedCode, setCombinedCode] = useState(`
    <style>${cssCode}</style>
    ${htmlCode}
  `);

  useEffect(() => {
    setCombinedCode(`
      <style>${cssCode}</style>
      ${htmlCode}
    `);
  }, [htmlCode, cssCode]);

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
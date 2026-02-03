import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaLandmark } from 'react-icons/fa';

const LiveVideos = () => {
  const { colors } = useTheme();

  return (
    <div style={{
      marginBottom: "60px",
      backgroundColor: colors.card,
      borderRadius: "16px",
      padding: "40px",
      boxShadow: `0 4px 12px ${colors.shadow}`
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "30px",
        color: colors.text,
        fontSize: "28px",
        fontWeight: "bold",
        borderBottom: "3px solid #28a745",
        paddingBottom: "15px",
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        justifyContent: "center"
      }}>
        <FaLandmark /> Câmara dos Deputados
      </h2>

      <div style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        borderRadius: "12px",
        backgroundColor: "#000"
      }}>
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          src="https://www.youtube.com/embed/videoseries?list=UU-ZkSRh-7UEuwXJQ9UMCFJA"
          title="Câmara dos Deputados"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export { LiveVideos };

import React from 'react';

const Skeleton = ({ count = 5, variants = [], marginTop = 0 }) => {
    const baseStyle = {
        backgroundColor: '#eee',
        backgroundImage: 'linear-gradient(90deg, #eee, #f5f5f5, #eee)',
        backgroundSize: '200px 100%',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        lineHeight: 1,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        animation: 'skeleton-animation 1.5s ease-in-out infinite',
    };

    /*CONFIGURABLES RECOMENDADOS (variants)
        width: ' ',
        maxWidth: ' ',
        height: ' ',
        borderRadius: ' ',
        marginBottom: ' ',
    */

    const skeletons = Array.from({ length: count }).map((_, i) => {
        const variantStyle = variants[i] || {};
        return (
            <span key={i} style={{ ...baseStyle, ...variantStyle }}>
                &zwnj;
            </span>
        );
    });

    return (
        <>
            <style>
                {`
          @keyframes skeleton-animation {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }
        `}
            </style>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop }}>
                {skeletons}
            </div>
        </>
    );
};

export default Skeleton;

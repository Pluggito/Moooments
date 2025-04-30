import styled from 'styled-components';

const PageLoader = () => {
    return (
        <StyledWrapper>
            <div className="loader" aria-live="assertive" role="alert" />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4); /* Dark overlay */
  backdrop-filter: blur(10px); /* Blur effect */
  z-index: 9999; /* Ensures it's on top */

  .loader {
    --hue: 289; /* Adjusted hue for #c300f9 */
    --size: 60px; /* Reduced size */
    --border: 8px; /* Slightly thinner border */
    --speed: 1.5s; /* Faster animation */
    --blur: var(--border);
    width: var(--border);
    aspect-ratio: 1;
    background: white;
    border-radius: 50%;
    position: absolute;
    --y: calc((var(--size) * -0.5) + (var(--border) * 0.5));
    transform: rotate(0deg) translateY(var(--y));
    animation: spin var(--speed) infinite linear;
  }

  .loader::before {
    content: "";
    position: absolute;
    inset: calc(var(--border) * -0.5);
    border-radius: 50%;
    background: white;
    filter: blur(var(--blur));
    z-index: -1;
  }

  .loader::after {
    content: "";
    width: var(--size);
    aspect-ratio: 1;
    position: absolute;
    top: 0%;
    left: 50%;
    translate: -50% 0;
    background: conic-gradient(
      white,
      #c300f9, /* New primary color */
      hsl(289, 100%, 20%), /* Darker shade */
      transparent 65%
    );
    border-radius: 50%;
    mask: radial-gradient(
      transparent calc(((var(--size) * 0.5) - var(--border)) - 1px),
      white calc((var(--size) * 0.5) - var(--border))
    );
  }

  @keyframes spin {
    to {
      transform: rotate(-360deg) translateY(var(--y));
    }
  }
`;

export default PageLoader;

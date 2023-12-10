import "./Button.css";

const Icons = {
  TripleDot: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect id="Rectangle 160" x="3" y="9" width="2" height="2" fill="white" />
      <rect id="Rectangle 164" x="7" y="7" width="2" height="2" fill="white" />
      <rect id="Rectangle 165" x="9" y="7" width="2" height="2" fill="white" />
      <rect id="Rectangle 168" x="13" y="7" width="2" height="2" fill="white" />
      <rect id="Rectangle 169" x="15" y="7" width="2" height="2" fill="white" />
      <rect id="Rectangle 170" x="15" y="9" width="2" height="2" fill="white" />
      <rect id="Rectangle 171" x="13" y="9" width="2" height="2" fill="white" />
      <rect id="Rectangle 166" x="9" y="9" width="2" height="2" fill="white" />
      <rect id="Rectangle 167" x="7" y="9" width="2" height="2" fill="white" />
      <rect id="Rectangle 161" x="3" y="7" width="2" height="2" fill="white" />
      <rect id="Rectangle 162" x="1" y="7" width="2" height="2" fill="white" />
      <rect id="Rectangle 163" x="1" y="9" width="2" height="2" fill="white" />
    </svg>
  ),
  Reduce: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="13" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="9" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="11" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="5" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="13" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="7" y="11" width="2" height="2" fill="#FAF7A4" />
      <rect x="7" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="3" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="9" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="5" y="9" width="2" height="2" fill="#FAF7A4" />
      <rect x="11" y="9" width="2" height="2" fill="#FAF7A4" />
    </svg>
  ),
  Enlarge: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="8" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="10" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="12" width="2" height="2" fill="#00BBAA" />
      <rect x="3" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="8" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="10" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="12" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="9" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="9" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="5" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="11" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="11" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="5" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="7" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="13" y="14" width="2" height="2" fill="#00BBAA" />
      <rect x="7" y="4" width="2" height="2" fill="#00BBAA" />
      <rect x="11" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="5" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="7" y="6" width="2" height="2" fill="#00BBAA" />
      <rect x="9" y="6" width="2" height="2" fill="#00BBAA" />
    </svg>
  ),
  Close: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="5" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="10" y="7" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="12" y="5" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="6" y="7" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="6" y="11" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="4" y="13" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect x="8" y="9" width="2" height="2" fill="#F06E8D" stroke="#F06E8D" />
      <rect
        x="10"
        y="11"
        width="2"
        height="2"
        fill="#F06E8D"
        stroke="#F06E8D"
      />
      <rect
        x="12"
        y="13"
        width="2"
        height="2"
        fill="#F06E8D"
        stroke="#F06E8D"
      />
    </svg>
  ),
};

type ButtonProps = {
  color: string;
  icon?: keyof typeof Icons;
  content?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

function Button({ icon, content, color, className, ...props }: ButtonProps) {
  return (
      <button {...props} className={`${color} ${className || ''} Button`}>
        <div className={`ButtonInner ${content && 'ButtonText'}`}>{icon && Icons[icon]}{content}</div>
      </button>
  );
}

export default Button;
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

// The existing page or component you want to print
const MyPage = React.forwardRef((props, ref) => (
    <div ref={ref}>
        <h1>Printable Content</h1>
        <p>This is the content that will be printed.</p>
        {/* Any other content */}
    </div>
));

// Component that includes the print button
const PrintPageButton = () => {
    // Use a ref to point to the component you want to print
    const componentRef = useRef();

    return (
        <div>
            {/* The button that triggers the print */}
            <ReactToPrint
                trigger={() => <button>Print this page</button>}
                content={() => componentRef.current}
            />

            {/* The component to be printed */}
            <MyPage ref={componentRef} />
        </div>
    );
};

export default PrintPageButton;

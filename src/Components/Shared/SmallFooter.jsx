import React from 'react';

const SmallFooter = () => {
      const currentYear = new Date().getFullYear();

    return (
        <div>
             <p className="text-gray-400 text-sm text-center">
            © {currentYear} GarmentTrack. All rights reserved. Made with 💛 in Bangladesh.
          </p>
        </div>
    );
};

export default SmallFooter;
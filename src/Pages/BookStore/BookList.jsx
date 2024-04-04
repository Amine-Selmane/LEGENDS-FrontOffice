import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import CallAction from "../../Component/CallAction";
import GotoTop from "../../Component/GotoTop";
import BooksContainer from "./BooksContainer";
import { Pagination } from 'antd'; // Import Pagination from Ant Design
import React from 'react';

function BookList() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clear the timer on component unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  let content = null;
  if (isLoading) {
    content = <Preloader />;
  } else {
    content = (
      <>
        <Header logo="assets/images/logo.png" joinBtn={true} />
        <Banner title="Books" background="assets/images/banner3.jpg" />
        <section className="coursepage-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <BooksContainer />
              </div>
            </div>
          </div>
        </section>
        <CallAction btnClass="bisylms-btn" />
        <Footer />
        <GotoTop />
      </>
    );
  }

  // Pagination configuration
  const paginationConfig = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: total => `Total ${total} items`,
    pageSizeOptions: ['10', '20', '30'], // Customize page size options if needed
    // Handle page change event
    onChange: (page, pageSize) => {
      console.log('Page:', page, 'Page Size:', pageSize);
      // You can update the state or fetch data for the new page here
    },
    // Handle page size change event
    onShowSizeChange: (current, size) => {
      console.log('Current Page:', current, 'New Page Size:', size);
      // You can update the state or fetch data for the new page size here
    },
  };

  return (
    <>
     <div>
  {content}
</div>
<div style={{ textAlign: 'center', marginTop: '20px' }}>
  <Pagination {...paginationConfig} total={100} defaultPageSize={10} />
</div>

    </>
  );
}

export default BookList;

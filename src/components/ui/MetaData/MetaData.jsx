import { memo } from "react";
import { Helmet } from "react-helmet";
const MetaData = ({ title, description }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
    </>
  );
};

export default memo(MetaData);

import React from "react";
import Skeleton from "antd/lib/skeleton";

const LoadingScreen = () => (
    <Skeleton
        avatar
        paragraph={{ rows: 6 }}
        active
    />
);

export default LoadingScreen;
import React from "react";

interface Props {
  params: { slug: string[] };
}

function ProductPage({ params: { slug } }: Props) {
  return <div>ProductPage {slug}</div>;
}

export default ProductPage;

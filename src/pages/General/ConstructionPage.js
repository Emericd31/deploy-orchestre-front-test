import React from "react";
import constructionPage from '../../images/page_under_construction.png';

export default function ConstructionPage() {
    return (
        <div>
            <div style={{ height: '100vh', display: "flex", flexDirection: "Column", alignItems: "center", justifyContent: "center" }}>
                <img src={constructionPage} width="300px" />
            </div>
        </div>
    );
}

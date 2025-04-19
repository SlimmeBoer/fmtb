
import * as React from "react";
import {useTranslation} from "react-i18next";
import FaqAccordion from "../../components/data/FaqAccordion.jsx";

export default function Admin_FAQ() {

    const {t} = useTranslation();

    return (
        <FaqAccordion />
    )

}

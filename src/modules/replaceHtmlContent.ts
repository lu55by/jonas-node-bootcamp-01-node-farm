import type {Product} from "../types/index.js";

const replaceHtmlContent = (template: string, product: Product | undefined): string => {
    if (!product) return template;
    const {id, productName, image, from, nutrients, quantity, price, organic, description} = product;
    let rs: string = template.replace(/{%ID%}/g, id.toString());
    rs = rs.replace(/{%PRODUCT_NAME%}/g, productName);
    rs = rs.replace(/{%PRODUCT_IMAGE%}/g, image);
    rs = rs.replace(/{%PRODUCT_FROM%}/g, from);
    rs = rs.replace(/{%PRODUCT_NUTRIENTS%}/g, nutrients);
    rs = rs.replace(/{%PRODUCT_QUANTITY%}/g, quantity);
    rs = rs.replace(/{%PRODUCT_PRICE%}/g, price);
    rs = rs.replace(/{%NOT_ORGANIC%}/g, organic ? '' : 'not-organic');
    rs = rs.replace(/{%PRODUCT_DESC%}/g, description);
    return rs;
};

export default replaceHtmlContent;
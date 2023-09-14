import {IIcon} from '@components/Icon/IIcon';
import {Svg, Path} from 'react-native-svg';

export function FacebookIcon({size = 24, color}: IIcon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 43" fill="none">
      <Path
        id="Union"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6024 4.64314C8.98567 4.64314 5.24305 8.38575 5.24305 13.0025V30.0252C5.24305 34.6418 8.98567 38.3845 13.6024 38.3845H17.7061V38.3827V38.3453V38.3079V38.2705V38.2331V38.1957V38.1583V38.1209V38.0835V38.0461V38.0087V37.9713V37.9339V37.8965V37.8591V37.8216V37.7842V37.7468V37.7094V37.672V37.6346V37.5972V37.5598V37.5224V37.485V37.4476V37.4102V37.3728V37.3354V37.298V37.2606V37.2232V37.1858V37.1484V37.111V37.0736V37.0362V36.9988V36.9614V36.924V36.8866V36.8492V36.8118V36.7744V36.737V36.6996V36.6621V36.6247V36.5873V36.5499V36.5125V36.4751V36.4377V36.4003V36.3629V36.3255V36.2881V36.2507V36.2133V36.1759V36.1385V36.1011V36.0637V36.0263V35.9889V35.9515V35.9141V35.8767V35.8393V35.8019V35.7645V35.7271V35.6897V35.6523V35.6149V35.5775V35.54V35.5026V35.4652V35.4278V35.3904V35.353V35.3156V35.2782V35.2408V35.2034V35.166V35.1286V35.0912V35.0538V35.0164V34.979V34.9416V34.9042V34.8668V34.8294V34.792V34.7546V34.7172V34.6798V34.6424V34.605V34.5676V34.5302V34.4928V34.4554V34.4179V34.3805V34.3431V34.3057V34.2683V34.2309V34.1935V34.1561V34.1187V34.0813V34.0439V34.0065V33.9691V33.9317V33.8943V33.8569V33.8195V33.7821V33.7447V33.7073V33.6699V33.6325V33.5951V33.5577V33.5203V33.4829V33.4455V33.4081V33.3707V33.3333V33.2959V33.2584V33.221V33.1836V33.1462V33.1088V33.0714V33.034V32.9966V32.9592V32.9218V32.8844V32.847V32.8096V32.7722V32.7348V32.6974V32.66V32.6226V32.5852V32.5478V32.5104V32.473V32.4356V32.3982V32.3608V32.3234V32.286V32.2486V32.2112V32.1738V32.1363V32.0989V32.0615V32.0241V31.9867V31.9493V31.9119V31.8745V31.8371V31.7997V31.7623V31.7249V31.6875V31.6501V31.6127V31.5753V31.5379V31.5005V31.4631V31.4257V31.3883V31.3509V31.3135V31.2761V31.2387V31.2013V31.1639V31.1265V31.0891V31.0516V31.0142V30.9768V30.9394V30.902V30.8646V30.8272V30.7898V30.7524V30.715V30.6776V30.6402V30.6028V30.5654V30.528V30.4906V30.4532V30.4158V30.3784V30.341V30.3036V30.2662V30.2288V30.1914V30.154V30.1166V30.0792V30.0418V30.0044V29.967V29.9295V29.8921V29.8547V29.8173V29.7799V29.7425V29.7051V29.6677V29.6303V29.5929V29.5555V29.5181V29.4807V29.4433V29.4059V29.3685V29.3311V29.2937V29.2563V29.2189V29.1815V29.1441V29.1067V29.0693V29.0319V28.9945V28.9571V28.9197V28.8823V28.8449V28.8075V28.77V28.7326V28.6952V28.6578V28.6204V28.583V28.5456V28.5082V28.4708V28.4334V28.396V28.3586V28.3212V28.2838V28.2464V28.209V28.1716V28.1342V28.0968V28.0594V28.022V27.9846V27.9472V27.9098V27.8724V27.835V27.7976V27.7602V27.7228V27.6854V27.6479V27.6105V27.5731V27.5357V27.4983V27.4609V27.4235V27.3861V27.3487V27.3113V27.2739V27.2365V27.1991V27.1617V27.1243V27.0869V27.0495V27.0121V26.9747V26.9373V26.8999V26.8625V26.8251V26.7877V26.7503V26.7129V26.6755V26.6381V26.6007V26.5632V26.5258V26.4884V26.451V26.4136V26.3762V26.3388V26.3014V26.264V26.2266V26.1892V26.1518V26.1144V26.077V26.0396V26.0022V25.9648V25.9274V25.9214H15.7302C14.4711 25.9214 13.4504 24.9007 13.4504 23.6416C13.4504 22.3825 14.4711 21.3618 15.7302 21.3618H17.7065C17.7169 19.0135 17.9821 16.2664 19.6461 14.117C21.4508 11.786 24.4167 10.7226 28.4973 10.7226C29.7564 10.7226 30.7771 11.7434 30.7771 13.0025C30.7771 14.2616 29.7564 15.2823 28.4973 15.2823C25.1304 15.2823 23.8407 16.1473 23.2515 16.9083C22.5734 17.7843 22.2791 19.176 22.2662 21.3618H28.4972C29.7563 21.3618 30.7771 22.3825 30.7771 23.6416C30.7771 24.9007 29.7563 25.9214 28.4972 25.9214H22.2658V25.9274V25.9648V26.0022V26.0396V26.077V26.1144V26.1518V26.1892V26.2266V26.264V26.3014V26.3388V26.3762V26.4136V26.451V26.4884V26.5258V26.5632V26.6007V26.6381V26.6755V26.7129V26.7503V26.7877V26.8251V26.8625V26.8999V26.9373V26.9747V27.0121V27.0495V27.0869V27.1243V27.1617V27.1991V27.2365V27.2739V27.3113V27.3487V27.3861V27.4235V27.4609V27.4983V27.5357V27.5731V27.6105V27.6479V27.6854V27.7228V27.7602V27.7976V27.835V27.8724V27.9098V27.9472V27.9846V28.022V28.0594V28.0968V28.1342V28.1716V28.209V28.2464V28.2838V28.3212V28.3586V28.396V28.4334V28.4708V28.5082V28.5456V28.583V28.6204V28.6578V28.6952V28.7326V28.77V28.8075V28.8449V28.8823V28.9197V28.9571V28.9945V29.0319V29.0693V29.1067V29.1441V29.1815V29.2189V29.2563V29.2937V29.3311V29.3685V29.4059V29.4433V29.4807V29.5181V29.5555V29.5929V29.6303V29.6677V29.7051V29.7425V29.7799V29.8173V29.8547V29.8921V29.9295V29.967V30.0044V30.0418V30.0792V30.1166V30.154V30.1914V30.2288V30.2662V30.3036V30.341V30.3784V30.4158V30.4532V30.4906V30.528V30.5654V30.6028V30.6402V30.6776V30.715V30.7524V30.7898V30.8272V30.8646V30.902V30.9394V30.9768V31.0142V31.0516V31.0891V31.1265V31.1639V31.2013V31.2387V31.2761V31.3135V31.3509V31.3883V31.4257V31.4631V31.5005V31.5379V31.5753V31.6127V31.6501V31.6875V31.7249V31.7623V31.7997V31.8371V31.8745V31.9119V31.9493V31.9867V32.0241V32.0615V32.0989V32.1363V32.1738V32.2112V32.2486V32.286V32.3234V32.3608V32.3982V32.4356V32.473V32.5104V32.5478V32.5852V32.6226V32.66V32.6974V32.7348V32.7722V32.8096V32.847V32.8844V32.9218V32.9592V32.9966V33.034V33.0714V33.1088V33.1462V33.1836V33.221V33.2584V33.2959V33.3333V33.3707V33.4081V33.4455V33.4829V33.5203V33.5577V33.5951V33.6325V33.6699V33.7073V33.7447V33.7821V33.8195V33.8569V33.8943V33.9317V33.9691V34.0065V34.0439V34.0813V34.1187V34.1561V34.1935V34.2309V34.2683V34.3057V34.3431V34.3805V34.4179V34.4554V34.4928V34.5302V34.5676V34.605V34.6424V34.6798V34.7172V34.7546V34.792V34.8294V34.8668V34.9042V34.9416V34.979V35.0164V35.0538V35.0912V35.1286V35.166V35.2034V35.2408V35.2782V35.3156V35.353V35.3904V35.4278V35.4652V35.5026V35.54V35.5775V35.6149V35.6523V35.6897V35.7271V35.7645V35.8019V35.8393V35.8767V35.9141V35.9515V35.9889V36.0263V36.0637V36.1011V36.1385V36.1759V36.2133V36.2507V36.2881V36.3255V36.3629V36.4003V36.4377V36.4751V36.5125V36.5499V36.5873V36.6247V36.6621V36.6996V36.737V36.7744V36.8118V36.8492V36.8866V36.924V36.9614V36.9988V37.0362V37.0736V37.111V37.1484V37.1858V37.2232V37.2606V37.298V37.3354V37.3728V37.4102V37.4476V37.485V37.5224V37.5598V37.5972V37.6346V37.672V37.7094V37.7468V37.7842V37.8216V37.8591V37.8965V37.9339V37.9713V38.0087V38.0461V38.0835V38.1209V38.1583V38.1957V38.2331V38.2705V38.3079V38.3453V38.3827V38.3845H30.6251C35.2418 38.3845 38.9844 34.6418 38.9844 30.0252V13.0025C38.9844 8.38576 35.2418 4.64314 30.6251 4.64314H13.6024ZM0.683411 13.0025C0.683411 5.86753 6.46745 0.0834961 13.6024 0.0834961H30.6251C37.76 0.0834961 43.5441 5.86753 43.5441 13.0025V30.0252C43.5441 37.1601 37.76 42.9441 30.6251 42.9441H13.6024C6.46744 42.9441 0.683411 37.1601 0.683411 30.0252V13.0025Z"
        fill={color}
      />
    </Svg>
  );
}

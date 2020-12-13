// /*eslint-disable*/
// import React from "react";
// // nodejs library to set properties for components
// import PropTypes from "prop-types";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // material-ui core components
// import { List, ListItem } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// // @material-ui/icons
// import Favorite from "@material-ui/icons/Favorite";
// import styles from "../../sources/jss/footerStyle";
// const useStyles = makeStyles(styles)
// export default function Footer(props): JSX.Element {
//   const classes = useStyles();
//   const { whiteFont } = props;
//   const footerClasses = classNames({
//     [classes.footer]: true,
//     [classes.footerWhiteFont]: whiteFont
//   });
//   const aClasses = classNames({
//     [classes.a]: true,
//     [classes.footerWhiteFont]: whiteFont
//   });
//   return (
//     <footer className={footerClasses}>
//       <div className={classes.container}>
//         <div className={classes.left}>
//           <List className={classes.list}>
//             <ListItem className={classes.inlineBlock}>
//               <a
//                 href="localhost:3000/contact"
//                 className={classes.block}
//                 target="_blank"
//               >
//                 Contact
//               </a>
//             </ListItem>
//             <ListItem className={classes.inlineBlock}>
//               <a
//                 href="localhost:3000/aboutus"
//                 className={classes.block}
//                 target="_blank"
//               >
//                 About us
//               </a>
//             </ListItem>
//             <ListItem className={classes.inlineBlock}>
//               <a
//                 href="localhost:3000/QA"
//                 className={classes.block}
//                 target="_blank"
//               >
//                 Q&A
//               </a>
//             </ListItem>
//             <ListItem className={classes.inlineBlock}>
//               <a
//                 href="localhost:3000/license"
//                 className={classes.block}
//                 target="_blank"
//               >
//                 Licenses
//               </a>
//             </ListItem>
//           </List>
//         </div>
//         <div className={classes.right}>
//           &copy; {new Date()} , made by{" "}
//           <Favorite className={classes.icon} /> by{" "}
//           <a
//             href="localhost:3000/creator"
//             className={aClasses}
//             target="_blank"
//           >
//             Salih Saygi
//           </a>{" "}
//           for a better web.
//         </div>
//       </div>
//     </footer>
//   );
// }
// Footer.propTypes = {
//   whiteFont: PropTypes.bool
// };

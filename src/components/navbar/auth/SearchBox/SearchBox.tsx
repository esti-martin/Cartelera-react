import styles from './SearchBox.module.css';
import { CgSearch } from "react-icons/cg";

function SearchBox() {
  return (
    <form action="" className={styles.box}>
      <input type="text" placeholder='Buscar'/>
      <botton>
        <CgSearch className={styles.searchIcon} size={32}/>
      </botton>
    </form>
  );
}

export default SearchBox;
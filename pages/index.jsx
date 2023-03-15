import AllCards from "@/source/Components/CategoryCard/AllCards";
import Charts from "@/source/Components/Charts/Charts";
import Footer from "@/source/Components/Footer";
import Transactions from "@/source/Components/Transactions/Transactions";
import useGetDocs from "@/source/hooks/useGetDocs";
import { setCategories, setTransactions } from "@/source/store/app-slice";
import { useDispatch } from "react-redux";
import Header from "../source/Components/Header/Header";
import styles from '../styles/initial.module.scss';
export default function Home() {
  const dispatch = useDispatch();

  dispatch(setCategories(useGetDocs('categorias')));
  dispatch(setTransactions(useGetDocs('transactions')));

  return (
    <main className={styles.main}>
      <Header />
      <AllCards />
      <Charts />
      <Transactions />
      <Footer />
    </main>
  );
}
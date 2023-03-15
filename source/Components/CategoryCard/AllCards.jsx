import CategoryCard from './CategoryCard';
import styles from './AllCards.module.scss';
import NoCard from './NoCard';
import AddAmount from './modais/AddAmount';
import SubtractAmount from './modais/SubtractAmount';
import TransferAmount from './modais/TransferAmount';
import EditCategory from './modais/EditCategory';
import AddCategory from './modais/AddCategory';
import AddSalary from '../Header/modais/AddSalary';
import useGetDocs from '@/source/hooks/useGetDocs';
import { useSelector } from 'react-redux';

// const DUMMY_DATA = [
//   { id: 1, title: 'essencial', amount: 1400, percentage: 10 },
//   { id: 2, title: 'investimentos', amount: 700, percentage: 50 },
//   { id: 3, title: 'poupança', amount: 400, percentage: 30 }
// ];

const AllCards = () => {
  const { categories } = useSelector((state) => state.app);

  const cards = categories.map(category => <CategoryCard key={category.id} data={category} />) 

  return (
    <>
      <AddAmount />
      <SubtractAmount />
      <TransferAmount />
      <EditCategory />
      <AddCategory />
      <AddSalary />
      <section className={styles.section}>
        {cards}
        <NoCard />
      </section>
    </>
  );
};

export default AllCards;
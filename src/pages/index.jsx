import { React } from 'react';
import styles from './App.module.scss';
import Dashboard from '../components/Dashboard/Dashboard';

export default function App () {
  return (
    <div className={styles.App}>
      <Dashboard />
    </div>
  );
}

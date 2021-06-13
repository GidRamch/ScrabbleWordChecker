import { Injectable } from '@angular/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { LoadingService } from '../loading/loading.service';
import { StorageService } from '../storage/storage.service';

const DEFINITION_DB_VERSION_STORAGE_KEY = 'definition-db-version';
const DEFINITION_DB_VERSION = 1;

type DatabaseName = 'definitions-large';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private storageService: StorageService,
    private loadingService: LoadingService,
  ) { }


  public async checkDefinitionsDbUpdated(): Promise<void> {
    if ((await this.storageService.get(DEFINITION_DB_VERSION_STORAGE_KEY)) === DEFINITION_DB_VERSION) { return; }

    let loading: HTMLIonLoadingElement;

    try {
      loading = await this.loadingService.present('Importing new database. This will only take a moment...');

      await CapacitorSQLite.copyFromAssets();
      await this.storageService.set(DEFINITION_DB_VERSION_STORAGE_KEY, DEFINITION_DB_VERSION);

    } catch (err) {
      console.error(err);
    } finally {
      if (loading) { loading.dismiss(); }
    }
  }


  public async executeQuery(statement: string, database: DatabaseName): Promise<any[]> {
    if (!(await this.isDatabaseConnectionExists(database))) {
      await CapacitorSQLite.createConnection({
        database,
      });
    }

    if (!(await this.isDatabaseOpen(database))) {
      await CapacitorSQLite.open({
        database,
      });
    }

    return (
      (await CapacitorSQLite.query(
        {
          database,
          statement,
          values: [],
        }
      )).values
    );
  }


  private async isDatabaseConnectionExists(database: DatabaseName): Promise<boolean> {
    try {
      return (await CapacitorSQLite.isDBExists({ database })).result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }


  private async isDatabaseOpen(database: DatabaseName): Promise<boolean> {
    try {
      return (await CapacitorSQLite.isDBOpen({ database })).result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

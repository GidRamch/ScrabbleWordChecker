import { Injectable } from '@angular/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { App } from '@capacitor/app';
import { AlertService } from '../alert/alert.service';
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
    private alertService: AlertService,
  ) { }


  public async checkDefinitionsDbUpdated(): Promise<void> {
    if (
      (await this.storageService.get(DEFINITION_DB_VERSION_STORAGE_KEY)) === DEFINITION_DB_VERSION
      && await this.isDatabase('definitions-large')
    ) { return; }

    let loading: HTMLIonLoadingElement;

    try {
      loading = await this.loadingService.present('Importing new database. This will only take a moment...');

      await CapacitorSQLite.copyFromAssets({
        overwrite: true,
      });
      await this.storageService.set(DEFINITION_DB_VERSION_STORAGE_KEY, DEFINITION_DB_VERSION);

      if (loading) { loading.dismiss(); }
    } catch (err) {
      console.error(err);
      if (loading) { loading.dismiss(); }
      await this.alertService.force(
        'There was an problem updating the definitions database.',
        'Please restart the application to try again!',
        'You may also try clearing the app data.'
      );
      App.exitApp();
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


  private async isDatabase(database: DatabaseName): Promise<boolean> {
    try {
      return (await CapacitorSQLite.isDatabase({ database })).result;
    } catch (err) {
      console.error(err);
      return false;
    }
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

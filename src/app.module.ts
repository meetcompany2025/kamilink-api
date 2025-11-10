import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UploadsModule } from './uploads/uploads.module';
import { FreightStatusHistoryModule } from './freight-status-history/freight-status-history.module';
import { FreightLocationTrackingModule } from './freight-location-tracking/freight-location-tracking.module';
import { FreightsModule } from './freight/freight.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MailModule } from './shared/providers/mail/mail.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { NotificationModule } from './notification/notification.module';
import { ClientsModule } from './clients/clients.module';
import { TransportersModule } from './transporters/transporters.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FreightsModule,
    VehiclesModule,
    ReviewsModule,
    UploadsModule,
    ClientsModule,
    TransportersModule,
    FreightStatusHistoryModule,
    FreightLocationTrackingModule,
    EmailConfirmationModule,
    MailModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {ROUTES} from '../router/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { ExplainComponent } from './pages/home/explain/explain.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {HttpService} from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import {TotastService} from './service/totast.service';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { RegisterComponent } from './login/register/register.component';
import { ProtocolComponent } from './login/register/protocol/protocol.component';
import { PaymentComponent } from './payment/payment.component';
import { PayDoingComponent } from './payment/pay-doing/pay-doing.component';
import { PaySuccessComponent } from './payment/pay-success/pay-success.component';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { PopupComponent } from './pages/common/dialog/popup/popup.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeProductDetailsComponent } from './pages/home/home-product-details/home-product-details.component';
import { SwiperComponent } from './pages/common/swiper/swiper.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductPicShowComponent } from './pages/home/home-product-details/product-pic-show/product-pic-show.component';
import { ProductAmountComponent } from './pages/home/home-product-details/product-pic-show/product-amount/product-amount.component';
import { ProductSearchComponent } from './pages/home/product-search/product-search.component';
import {LocalStorageService} from './service/local-storage.service';
import { ProductSearchListComponent } from './pages/home/product-search/product-search-list/product-search-list.component';
import { ProductSearchListSupernatantComponent } from './pages/home/product-search/product-search-list/product-search-list-supernatant/product-search-list-supernatant.component';
import { HomeFiltrateDetailComponent } from './pages/home/home-filtrate-detail/home-filtrate-detail.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { HomeProductDemandComponent } from './pages/home/home-product-details/home-product-demand/home-product-demand.component';
import { ShoppingOrderMessageComponent } from './pages/shopping-cart/shopping-order-message/shopping-order-message.component';
import { PaymentChoiceComponent } from './pages/common/payment-choice/payment-choice.component';
import { ShoppingOrderInvoiceComponent } from './pages/shopping-cart/shopping-order-invoice/shopping-order-invoice.component';
import { ShoppingOrderDebitnoteComponent } from './pages/shopping-cart/shopping-order-debitnote/shopping-order-debitnote.component';
import { ShoppingOrderAddressComponent } from './pages/shopping-cart/shopping-order-address/shopping-order-address.component';
import { ShoppingOrderCreateAddressComponent } from './pages/shopping-cart/shopping-order-address/shopping-order-create-address/shopping-order-create-address.component';
import { CityPlugsComponent } from './pages/common/city-plugs/city-plugs.component';
import { ShoppingOrderOnlinePaymentComponent } from './pages/shopping-cart/shopping-order-online-payment/shopping-order-online-payment.component';
import { DialogPopupComponent } from './pages/common/dialog-popup/dialog-popup.component';
import { ShoppingOrderPaymentSuccessComponent } from './pages/shopping-cart/shopping-order-payment-success/shopping-order-payment-success.component';
import { ShoppingOrderListComponent } from './pages/shopping-cart/shopping-order-list/shopping-order-list.component';
import { ShoppingOrderListDetailComponent } from './pages/shopping-cart/shopping-order-list-detail/shopping-order-list-detail.component';
import { DialogMultipleComponent } from './pages/common/dialog-multiple/dialog-multiple.component';
import { ShoppingOrderTransportationComponent } from './pages/shopping-cart/shopping-order-transportation/shopping-order-transportation.component';
import { GuessYouLikeComponent } from './pages/common/guess-you-like/guess-you-like.component';
import { SettingsCenterComponent } from './pages/settings/settings-center/settings-center.component';
import { SettingsMessageComponent } from './pages/settings/settings-message/settings-message.component';
import { SettingsNicknameComponent } from './pages/settings/settings-nickname/settings-nickname.component';
import { SettingsPhoneComponent } from './pages/settings/settings-phone/settings-phone.component';
import { SettingsPassworldComponent } from './pages/settings/settings-passworld/settings-passworld.component';
import { ShoppingOrderEditAddressComponent } from './pages/shopping-cart/shopping-order-address/shopping-order-edit-address/shopping-order-edit-address.component';
import { WxLoginCallbackComponent } from './login/wx-login-callback/wx-login-callback.component';
import { RechargeComponent } from './payment/recharge/recharge.component';
import { RechargeListComponent } from './payment/recharge/recharge-list/recharge-list.component';
import { RechargeOrderDebitnoteComponent } from './payment/recharge/recharge-order-debitnote/recharge-order-debitnote.component';
import { ShoppingOrderSubmitSuccessComponent } from './pages/shopping-cart/shopping-order-submit-success/shopping-order-submit-success.component';
import { FindListComponent } from './pages/settings/find-list/find-list.component';
import { FindListDetailComponent } from './pages/settings/find-list-detail/find-list-detail.component';
import { InvoiceDetailComponent } from './pages/settings/find-list-detail/invoice-detail/invoice-detail.component';
import { TransportComponent } from './pages/transport/transport.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { ScrollComponent } from './pages/common/scroll/scroll.component';
import { ProductSearchCeshiComponent } from './pages/home/product-search/product-search-list/product-search-ceshi/product-search-ceshi.component';
import {WeUiModule} from 'ngx-weui';
import {PageComponent} from './pages/common/page/page.component';
import { PayComponent } from './pages/shopping-cart/shopping-order-online-payment/pay/pay.component';
import {ToastService} from './components/toast';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    MainComponent,
    SearchComponent,
    ExplainComponent,
    FooterComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    ProtocolComponent,
    PaymentComponent,
    PayDoingComponent,
    PaySuccessComponent,
    PopupComponent,
    ShopComponent,
    HomeProductDetailsComponent,
    SwiperComponent,
    ShoppingCartComponent,
    ProductPicShowComponent,
    ProductAmountComponent,
    ProductSearchComponent,
    ProductSearchListComponent,
    ProductSearchListSupernatantComponent,
    HomeFiltrateDetailComponent,
    HeaderComponent,
    HomeProductDemandComponent,
    ShoppingOrderMessageComponent,
    PaymentChoiceComponent,
    ShoppingOrderInvoiceComponent,
    ShoppingOrderDebitnoteComponent,
    ShoppingOrderAddressComponent,
    ShoppingOrderCreateAddressComponent,
    CityPlugsComponent,
    ShoppingOrderOnlinePaymentComponent,
    DialogPopupComponent,
    ShoppingOrderPaymentSuccessComponent,
    ShoppingOrderListComponent,
    ShoppingOrderListDetailComponent,
    DialogMultipleComponent,
    ShoppingOrderTransportationComponent,
    GuessYouLikeComponent,
    SettingsCenterComponent,
    SettingsMessageComponent,
    SettingsNicknameComponent,
    SettingsPhoneComponent,
    SettingsPassworldComponent,
    ShoppingOrderEditAddressComponent,
    WxLoginCallbackComponent,
    RechargeComponent,
    RechargeListComponent,
    RechargeOrderDebitnoteComponent,
    ShoppingOrderSubmitSuccessComponent,
    FindListComponent,
    FindListDetailComponent,
    InvoiceDetailComponent,
    TransportComponent,
    PartnerComponent,
    ScrollComponent,
    ProductSearchCeshiComponent,
    PageComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    WeUiModule.forRoot()
  ],
  providers: [
    HttpService,
    TotastService,
    ToastService,
    LocalStorageService,
    /*{ provide: LocationStrategy, useClass: HashLocationStrategy, }*/
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

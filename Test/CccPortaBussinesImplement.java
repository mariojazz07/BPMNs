/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hn.com.tigo.cccportal.ebj.bussines.implement;

import com.tigo.billing.adapters.creategroupresponse_schema.CreateGroupResponseType;
import com.tigo.billing.adapters.deletegroupresponse_schema.DeleteGroupResponseType;
import com.tigo.enterprise.resources.parameters.simple.v1.schema.ParameterType;
import com.tigo.enterprise.serviceentity.queryprovisioningorders.v1.schema.BasicGetIMEIStateResult;
import com.tigo.enterprise.serviceentity.queryprovisioningorders.v1.schema.BasicGetOperatorIMEIStateResult;
import com.tigo.enterprise.serviceentity.queryprovisioningorders.v1.schema.BasicGetProvisioningOrdersByPhoneResult;
import com.tigo.enterprise.serviceentity.queryprovisioningorders.v1.schema.BasicGetProvisioningOrdersByUserResult;
import com.tigo.enterprise.serviceentity.queryprovisioningorders.v1.schema.BasicGetProvisioningOrdersLTEResult;
import com.tigo.hn.servicesamsys.ArrayClientesActivos;
import com.tigo.hn.servicesamsys.ArrayEmailCliente;
import com.tigo.hn.servicesamsys.ArrayHistoricoCliente;
import com.tigo.hn.servicesamsys.ArrayIdentificacion;
import com.tigo.hn.servicesamsys.ArrayObtenerConexion;
import com.tigo.hn.servicesamsys.ArrayObtenerFacturacion;
import com.tigo.hn.servicesamsys.ArrayPromocionClientes;
import com.tigo.hn.servicesamsys.DatosCliente;
import com.tigo.hn.servicesamsys.ObtenerSaldo;
import com.tigo.resources.getinsurancedetail.v1.schema.GetInsuranceDetailResponseType;
import com.tigo.resources.getinsurancedetail.v1.schema.InsuranceDetailType;

import hn.com.tigo.cccportal.common.Constantes;
import hn.com.tigo.cccportal.ebj.dto.MsSubsProfile;
import hn.com.tigo.cccportal.ebj.dto.TableTransfers;
import hn.com.tigo.cccportal.ebj.dto.TolWctWallet;
import hn.com.tigo.cccportal.persistencia.PersistenceLocal;
import hn.com.tigo.cccportal.persistencia.entidades.TolChannels;
import hn.com.tigo.cccportal.persistencia.entidades.TolSuSuspencionRestriccion;
import hn.com.tigo.cccportal.persistencia.entidades.TolUsrUser;
import hn.com.tigo.cccportal.util.BeanComparator;
import hn.com.tigo.cccportal.util.LoggerUtil;
import hn.com.tigo.cccportal.util.Utilidades;
import hn.com.tigo.josm.adapter.requesttype.v1.TaskResponseType;
import hn.com.tigo.josm.orchestrator.adapter.zbp.AdapterException_Exception;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.adjustDar.AdjustDarInfo;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.adjustDar.AdjustIntegration;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.balance.SaldoActualDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.catalogs.MessaginServiceEmailGeneralResponseDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.getcdr.GetCDRResult;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.getcustomerinfo.GenericResponse;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.getinvoices.GetInvoiceResult;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.getinvoicesdetails.GetInvoiceDetail;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.getransfers.GetTransferLogResult;
import hn.com.tigo.tolcccserviceconsumer.bussines.dto.getrecharge.GetRechargeLogResult;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.EmailServiceImplement;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetAdjustDarImpl;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetBalanceServiceImplement;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetCdrServiceImpl;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetCustomerInfoImplement;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetInsuranceDetailService;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetInvoiceDetailsServiceImpl;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetInvoiceServiceImpl;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetRechargeServiceImpl;
import hn.com.tigo.tolcccserviceconsumer.bussines.ejb.GetTransfersServiceImpl;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.GeneralResponse;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.accountInfo.ClientInformationDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getactiveloans.GetActLoansDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getbacktones.GetBacktonesDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.gethlr.GetHLRDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.GetNavegationDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.NavigationResponse;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getprestamogeneral.GetPrestamoGeneralDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getprestamomaxscorelimit.GetPrestamoMaxScoreLimitDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getprestamosaplicables.GetPrestamosAplicablesDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getprestamospagados.GetPrestamosPagadosDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getuserdetails.GetUserDetailsDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getuserdetails.GetUserDetailsResponseDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.provisioning.SubscriberMessagesDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.provisioning.SubscriptionsListDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.ruleenginetask.Product;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.ruleenginetask.RuleEngineTaskDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.as400getsubscriberbasicinfo.GetAs400GetSubscriberBasicInfoDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getactivospagosparciales.GetActivosPagosParcialesDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getadmingrupoadicionar.AdminGrupoAdicionarDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getadmingrupomiembrogrupo.MiembrosGrupoDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getadmingruporemover.AdicionarGrupoRemoveDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getadmingrupos.AdminGruposDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getadmingrupos.GruposDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getadmingruposuscriptor.AdminGrupoSuscriptorDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getcuentamovimiento.CuentaMovimientoDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getcuentamovimiento.GetCuentaMovimientoDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.getestadocuentacorriente.GetEstadoCuentaCorrienteDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.dto.ofertashrl.OrdenesHrlDTO;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.ejb.BasicSubscriberInfoEjb;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.ejb.CustomerEjb;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.ejb.GroupEjb;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.ejb.QueryProvisioningOrdersEjb;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.ejb.prestamos.GetPrestamosPagadosEncabezadosEjb;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.ejb.prestamos.dto.PrestamoPagadoHeader;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.wsintegration.basicsubscriber.BasicSubscriberInfoResult;
import hn.com.tigo.tolcccserviceconsumer.ws.ClientInformationImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetActiveLoansImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetActivosPagosParcialesService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetAdminGrupoAdicionarImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetAdminGrupoMemberListImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetAdminGrupoRemoveImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetAdminGrupoSuscriptorImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetAdminGruposImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetAs400GetSubscriberBasicInfo;
import hn.com.tigo.tolcccserviceconsumer.ws.GetBacktonesService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetCuentaMovimientosImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.GetEstadoCuentaCorrienteService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetHLRService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetMasterStatusHistoryService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetNavegationService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetNavigationDataCPE;
import hn.com.tigo.tolcccserviceconsumer.ws.GetPrestamoGeneralService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetPrestamoMaxScoreLimitService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetPrestamosAplicablesService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetPrestamosPagadosService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetSubscriberAllInfTaskService;
import hn.com.tigo.tolcccserviceconsumer.ws.GetUserDetailsImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.MsSubscriberProfileImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.OrdenesHrlService;
import hn.com.tigo.tolcccserviceconsumer.ws.ProvisioningImpl;
import hn.com.tigo.tolcccserviceconsumer.ws.RuleEngineTaskImpl;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.xml.datatype.XMLGregorianCalendar;

/**
 * The Class CccPortaBussinesImplement.
 *
 * @author ingeneo
 */
@Stateless(name = "CccPortaBussinesImplement", mappedName = "ejb/CccPortaBussinesImplement")
@LocalBean
public class CccPortaBussinesImplement {

	/** The clas. */
    String clas = CccPortaBussinesImplement.class.getSimpleName();
    
    /** The Constant log. */
    private static final LoggerUtil LOG = LoggerUtil.getInstance(CccPortaBussinesImplement.class);
    
    /** The dao. */
    @EJB
    private PersistenceLocal dao;
    
    /** The cdr service impl. */
    @EJB
    private GetCdrServiceImpl cdrServiceImpl;
    
    /** The recharge impl. */
    @EJB
    private GetRechargeServiceImpl rechargeImpl;
    
    /** The transfers service impl. */
    @EJB
    private GetTransfersServiceImpl transfersServiceImpl;
    
    /** The ejb customer. */
    @EJB
    GetCustomerInfoImplement ejbCustomer;
    
    /** The ejb get balance. */
    @EJB
    GetBalanceServiceImplement ejbGetBalance;
    
    /** The ejb get cdr. */
    @EJB
    GetCdrServiceImpl ejbGetCdr;
    
    /** The ejb get recharge. */
    @EJB
    GetRechargeServiceImpl ejbGetRecharge;
    
    /** The ejb get transfer. */
    @EJB
    GetTransfersServiceImpl ejbGetTransfer;
    
    /** The ejb get invoice. */
    @EJB
    GetInvoiceServiceImpl ejbGetInvoice;
    
    /** The ejb get invoice details. */
    @EJB
    GetInvoiceDetailsServiceImpl ejbGetInvoiceDetails;
    
    /** The ejb send email. */
    @EJB
    EmailServiceImplement ejbSendEmail;
    
    /** The ejb adjust dar. */
    @EJB
    GetAdjustDarImpl ejbAdjustDar;
    
    /** The ejb tigo money. */
    @EJB
    GetUserDetailsImpl ejbTigoMoney;
    
    /** The ejb get user detail. */
    @EJB
    GetUserDetailsImpl ejbGetUserDetail;
    
    /** The ejb get navegation. */
    @EJB
    GetNavegationService ejbGetNavegation;
    
    /** The ejb get prestamo general ultimo pago. */
    @EJB
    GetPrestamoGeneralService ejbGetPrestamoGeneralUltimoPago;
    
    /** The ejb get prestamo general score max limit. */
    @EJB
    GetPrestamoMaxScoreLimitService ejbGetPrestamoGeneralScoreMaxLimit;
    
    /** The ejb prestamos aplicables. */
    @EJB
    GetPrestamosAplicablesService ejbPrestamosAplicables;
    
    /** The ejb prestamos pagados. */
    @EJB
    GetPrestamosPagadosService ejbPrestamosPagados;
    
    /** The ejb cuenta movimientos. */
    @EJB
    GetCuentaMovimientosImpl ejbCuentaMovimientos;
    
    /** The ejb activos pagos parciales. */
    @EJB
    GetActivosPagosParcialesService ejbActivosPagosParciales;
    
    /** The ejb ordenes hrl. */
    @EJB
    OrdenesHrlService ejbOrdenesHrl;
    
    /** The ejb rule engaine task. */
    @EJB
    RuleEngineTaskImpl ejbRuleEngaineTask;
    
    /** The ejb client information. */
    @EJB
    ClientInformationImpl ejbClientInformation;
    
    /** The ejb get hlr. */
    @EJB
    GetHLRService ejbGetHlr;
    
    /** The ejb backtones. */
    @EJB
    GetBacktonesService ejbBacktones;
    
    /** The ms subscriber profile impl remote. */
    @EJB
    MsSubscriberProfileImpl msSubscriberProfileImplRemote;
    
    /** The get master status history service remote. */
    @EJB
    GetMasterStatusHistoryService getMasterStatusHistoryServiceRemote;
    
    /** The get provisioning. */
    @EJB
    ProvisioningImpl getProvisioning;
    
    /** The ejb get as400 basic info. */
    @EJB
    GetAs400GetSubscriberBasicInfo ejbGetAs400BasicInfo;
    
    /** The ejb get cuenta corriente. */
    @EJB
    GetEstadoCuentaCorrienteService ejbGetCuentaCorriente;
    
    /** The ejb admin grupo adicionar. */
    @EJB
    GetAdminGrupoAdicionarImpl ejbAdminGrupoAdicionar;
    
    /** The ejb admin grupo member list. */
    @EJB
    GetAdminGrupoMemberListImpl ejbAdminGrupoMemberList;
    
    /** The ejb admin grupo remove. */
    @EJB
    GetAdminGrupoRemoveImpl ejbAdminGrupoRemove;
    
    /** The ejb admin grupo suscriptor. */
    @EJB
    GetAdminGrupoSuscriptorImpl ejbAdminGrupoSuscriptor;
    
    /** The ejb admin grupos. */
    @EJB
    GetAdminGruposImpl ejbAdminGrupos;
    
    /** The ejb home. */
    @EJB
    CustomerEjb ejbHome;
    
    /** The ejb group. */
    @EJB
    GroupEjb ejbGroup;
    
    /** The ejb query provisioning orders. */
    @EJB
    QueryProvisioningOrdersEjb ejbQueryProvisioningOrders;
    
    /** The ejb p restamo pagado header. */
    @EJB
    private GetPrestamosPagadosEncabezadosEjb ejbPRestamoPagadoHeader;
    
    /** The basic subscriber info ejb. */
    @EJB
    public BasicSubscriberInfoEjb basicSubscriberInfoEjb;
    
    /** The active loans. */
    @EJB
    private GetActiveLoansImpl activeLoans;
    
    /** The get insurance detail service. */
    @EJB
    private GetInsuranceDetailService getInsuranceDetailService;
    
    /** The ejb get subscriber all inf. */
    @EJB
    GetSubscriberAllInfTaskService ejbGetSubscriberAllInf;
    
    @EJB
    GetNavigationDataCPE ejbGetNavigationDataCPE;
    
    /**
     * Instantiates a new ccc porta bussines implement.
     */
    public CccPortaBussinesImplement() {
    	ejbGetSubscriberAllInf=  new GetSubscriberAllInfTaskService();
    	ejbGetNavigationDataCPE = new GetNavigationDataCPE();
    }

    /**
     * Customer.
     *
     * @param key the key
     * @param primaryIdentity the primary identity
     * @param trxid2 the trxid2
     * @return the list
     */
    public List<GenericResponse> customer(String key, String primaryIdentity, String trxid2) {
        String method = "customer";
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " inicio (" + key + ")  ");
        List<GenericResponse> list = new ArrayList<GenericResponse>();
        try {
            list = ejbCustomer.customer(key, primaryIdentity, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin (" + key + ")  ");
        return list;
    }

    /**
     * METODO DE MAPEO DE SERVICIOS FREE_UNIT && BALANCE.
     *
     * @param trxid2 the trxid2
     * @param key the key
     * @param opt the opt
     * @return the list
     */
    public List<SaldoActualDTO> balance(String trxid2, String key, String opt) {
        String method = "balance(" + key + "," + opt + ")";
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " inicio metodo: ");
        List<SaldoActualDTO> list = new ArrayList<SaldoActualDTO>();
        try {
            list = ejbGetBalance.balance(trxid2, key, opt);
            List<TolWctWallet> wallets = dao.getWalletTol();
            list = Utilidades.changeNameWallets(wallets, list);
        } catch (Exception e) {
            LOG.error("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " Error: ", e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin metodo: ");
        return list;

    }

    /**
     * Balance saldo.
     *
     * @param trxid2 the trxid2
     * @param key the key
     * @param opt the opt
     * @return the list
     */
    public List<SaldoActualDTO> balanceSaldo(String trxid2, String key, String opt) {
        String method = "balanceSaldo(" + key + "," + opt + ")";
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " inicio metodo: ");
        List<SaldoActualDTO> list = new ArrayList<SaldoActualDTO>();
        try {
            list = ejbGetBalance.balanceSaldoSubscriptor(trxid2, key, opt);
            List<TolWctWallet> wallets = dao.getWalletTol();
            list = Utilidades.changeNameWallets(wallets, list);

        } catch (Exception e) {
            LOG.error("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " Error: ", e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin metodo: ");
        return list;

    }

    /**
     * Gets the cdr bussines.
     *
     * @param key the key
     * @param keyValue the key value
     * @param typeValue the type value
     * @param ciclo the ciclo
     * @param cicloValue the ciclo value
     * @param startDate the start date
     * @param endDate the end date
     * @param trxid2 the trxid2
     * @return the cdr bussines
     */
    public GetCDRResult getCdrBussines(String key, String keyValue, String typeValue, String ciclo, 
            String cicloValue, String startDate, String endDate, String trxid2) {
        String method = "getCdrBussines";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetCDRResult serviceResponse = new GetCDRResult();
        try {
            serviceResponse = cdrServiceImpl.getCdrsImpl(key, keyValue, typeValue, ciclo, cicloValue, startDate, endDate, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the recharge bussines.
     *
     * @param key the key
     * @param keyValue the key value
     * @param typeValue the type value
     * @param startDate the start date
     * @param endDate the end date
     * @param trxid2 the trxid2
     * @return the recharge bussines
     */
    public GetRechargeLogResult getRechargeBussines(String key, String keyValue, String typeValue, String startDate, String endDate, String trxid2) {
        String method = "getRechargeBussines";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetRechargeLogResult serviceResponse = new GetRechargeLogResult();
        try {
            serviceResponse = rechargeImpl.getRechargeImpl(key, keyValue, typeValue, startDate, endDate, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the transfer bussines.
     *
     * @param key the key
     * @param keyValue the key value
     * @param typeValue the type value
     * @param startDate the start date
     * @param endDate the end date
     * @param trxid2 the trxid2
     * @return the transfer bussines
     */
    public GetTransferLogResult getTransferBussines(String key, String keyValue, String typeValue, String startDate, String endDate, String trxid2) {
        String method = "getTransferBussines";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetTransferLogResult serviceResponse = new GetTransferLogResult();
        try {
            serviceResponse = transfersServiceImpl.getTransferImpl(key, keyValue, typeValue, startDate, endDate, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the invoice bussines.
     *
     * @param key the key
     * @param keyValue the key value
     * @param ciclo the ciclo
     * @param cicloValue the ciclo value
     * @param startDate the start date
     * @param endDate the end date
     * @param trxid2 the trxid2
     * @return the invoice bussines
     */
    public GetInvoiceResult getInvoiceBussines(String key, String keyValue, String ciclo, String cicloValue, String startDate, String endDate, String trxid2) {
        String method = "getInvoiceBussines";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetInvoiceResult serviceResponse = new GetInvoiceResult();
        try {
            serviceResponse = ejbGetInvoice.getInvoiceImpl(key, keyValue, ciclo, cicloValue, startDate, endDate, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the invoice details bussines.
     *
     * @param key the key
     * @param keyValue the key value
     * @param ciclo the ciclo
     * @param cicloValue the ciclo value
     * @param startDate the start date
     * @param endDate the end date
     * @param trxid2 the trxid2
     * @return the invoice details bussines
     */
    public GetInvoiceDetail getInvoiceDetailsBussines(String key, String keyValue, String ciclo, String cicloValue, 
            String startDate, String endDate, String trxid2) {
        String method = "getInvoiceDetailsBussines";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetInvoiceDetail serviceResponse = new GetInvoiceDetail();
        try {
            serviceResponse = ejbGetInvoiceDetails.getInvoiceDetailsImpl(key, keyValue, ciclo, cicloValue, startDate, endDate, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Send email.
     *
     * @param trxid the trxid
     * @param email the email
     * @param token the token
     * @return the messagin service email general response dto
     */
    public MessaginServiceEmailGeneralResponseDTO sendEmail(String trxid, String email, String token) {
        MessaginServiceEmailGeneralResponseDTO responseService = new MessaginServiceEmailGeneralResponseDTO();
        try {
            String request = Constantes.REQUEST_CAMBIO_PASSWORD;
            request = request.replace("$TOKEN", token).replace("$EMAIL", email);
            responseService = ejbSendEmail.consumeServiceEmailMessage(request, trxid);
        } catch (Exception e) {
            LOG.error("Error general " + e.getMessage(),e);
        }
        return responseService;
    }

    /**
     * Gets the tol user user by.
     *
     * @param userName the user name
     * @return the tol user user by
     */
    public TolUsrUser getTolUserUserBy(String userName) {
        TolUsrUser response = null;
        try {
            response = dao.getTolUserUserBy(userName);
        } catch (Exception e) {
            LOG.error("Error general" + e.getMessage(),e);
        }
        return response;
    }

    /**
     * Update pass by usr id.
     *
     * @param pass1 the pass1
     * @param pass2 the pass2
     * @param pass3 the pass3
     * @param userId the user id
     * @return true, if successful
     */
    public boolean updatePassByUsrId(String pass1, String pass2, String pass3, BigDecimal userId) {
        boolean response = false;
        try {
            response = dao.updatePassByUsrId(pass1, pass2, pass3, userId);
        } catch (Exception e) {
            LOG.error("Error general" + e.getMessage(),e);
        }
        return response;
    }

    /**
     * Gets the adjust dar.
     *
     * @param key the key
     * @param keyValue the key value
     * @param typeValue the type value
     * @param startDate the start date
     * @param endDate the end date
     * @param trxid2 the trxid2
     * @return the adjust dar
     */
    public List<TableTransfers> getAdjustDar(String key, String keyValue, String typeValue, String startDate, String endDate, String trxid2) {
        String method = "customer";
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " inicio (" + key + ")  ");
        List<TableTransfers> response = new ArrayList<TableTransfers>(0);
        try {
            AdjustIntegration serviceResponse = ejbAdjustDar.getAdjustDar(key, keyValue, typeValue, startDate, endDate, trxid2);
            if (serviceResponse != null && serviceResponse.getQueryAdjustDARLogResult() != null) {
                AdjustDarInfo[] adjustList = serviceResponse.getQueryAdjustDARLogResult().getAdjustDARInfo();
                response = getTableTransfers(adjustList);
            }
        } catch (Exception e) {
            LOG.error("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ", e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin (" + key + ")  ");
        return response;
    }

	/**
	 * Gets the table transfers.
	 *
	 * @param adjustList the adjust list
	 * @return the table transfers
	 * @throws ParseException the parse exception
	 */
	private List<TableTransfers> getTableTransfers(AdjustDarInfo[] adjustList) throws ParseException {
		List<TableTransfers> response = new ArrayList<TableTransfers>();
		for (AdjustDarInfo current : adjustList) {
		    TableTransfers tmp = new TableTransfers();
		    if (current.getTradeTime() != null) {
		        tmp.setFecha(hn.com.tigo.tolcccserviceconsumer.util.Utilidades.formatDateCBSToRowTableWhit(current.getTradeTime()));
		    }
		    if (current.getOrigin() != null) {
		        tmp.setOrigen(current.getOrigin());
		    }
		    if (current.getTarget() != null) {
		        tmp.setDestino(current.getTarget());
		    }
		    if (current.getTransID() != null) {
		        tmp.setTransId(current.getTransID());
		    }
		    if (current.getChannelID() != null) {
		        tmp.setCanal(current.getChannelID());
		    }
		    if (current.getBalanceAdjustmentInfo() != null && current.getBalanceAdjustmentInfo().length > 0) {
		        tmp.setMoneda(current.getBalanceAdjustmentInfo()[0].getCurrencyName());
		        tmp.setMonto(current.getBalanceAdjustmentInfo()[0].getAdjustmentAmt());
		        tmp.setBilletera(current.getBalanceAdjustmentInfo()[0].getBalanceTypeName());
		        tmp.setTipoAjuste(Utilidades.typeAdjust(current.getBalanceAdjustmentInfo()[0].getAdjustmentType()));
		    }
		    response.add(tmp);
		}
		return response;
	}

    /**
     * Gets the information tigo money.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @return the information tigo money
     */
    public GetUserDetailsResponseDTO getInformationTigoMoney(String trxid, String phone) {
        String method = "getInformationTigoMoney";
        GetUserDetailsResponseDTO response = null;
        try {
            GetUserDetailsDTO responseService = ejbTigoMoney.getUserDetailsTM(trxid, phone);
            if (responseService != null && responseService.getGeneralResponse().getStatus().equals(Constantes.STATUS_OK)
                    && responseService.getGetUserDetailsDTO() != null) {
                response = responseService.getGetUserDetailsDTO();
            } else {
                LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ");
            }
        } catch (Exception e) {
            LOG.error("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " Error general; detalle : " + e.getMessage(), e);
        }
        return response;
    }

    /**
     * Gets the user details.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @return the user details
     */
    public GetUserDetailsDTO getUserDetails(String trxid, String phone) {
        String method = "getUserDetails";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
        GetUserDetailsDTO serviceResponse = new GetUserDetailsDTO();
        try {
            serviceResponse = ejbTigoMoney.getUserDetailsTM(trxid, phone);
        } catch (Exception e) {

            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " fin ....  ");
        return serviceResponse;
    }

    //####################################################################################################################
    /**
     * Gets the navegation business.
     *
     * @param msisdn the msisdn
     * @param subscriptorType the subscriptor type
     * @param trxid2 the trxid2
     * @return the navegation business
     */
    //FASE 2
    public GetNavegationDTO getNavegationBusiness(String msisdn, String subscriptorType, String trxid2) {
        String method = "getNavegationBissnes";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetNavegationDTO serviceResponse = new GetNavegationDTO();
        try {
            serviceResponse = ejbGetNavegation.getNavegationDetailsService(msisdn, subscriptorType, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
	}

	/**
	 * Gets the navegation business pcc.
	 *
	 * @param msisdn the msisdn
	 * @param trxid2 the trxid2
	 * @return the navegation business pcc
	 */
	public GetNavegationDTO getNavegationBusinessPcc(final String msisdn, final String trxid2) {
		String method = "executeTask";
		LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
		GetNavegationDTO serviceResponse = new GetNavegationDTO();
		try {
			serviceResponse = ejbGetSubscriberAllInf.getSubscriberAllInfTaskService(msisdn, trxid2);
		} catch (Exception e) {
			LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
			LOG.error("error : " + e);
		}
		LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
		return serviceResponse;
	}

	public NavigationResponse getNavegationBusinessCPE(final String msisdn, final String trxid2) {
		String method = "executeCPE";
		LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
		NavigationResponse serviceResponse = new NavigationResponse();
		try {
			serviceResponse = ejbGetNavigationDataCPE.getNavigationDataCPEService(msisdn, trxid2);
		} catch (Exception e) {
			LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
			LOG.error("error : " + e);
		}
		LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
		return serviceResponse;
	}

    /**
     * Gets the prestamo ultimo pago business.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the prestamo ultimo pago business
     */
    public GetPrestamoGeneralDTO getPrestamoUltimoPagoBusiness(String msisdn, String trxid2) {
        String method = "getPrestamoUltimoPagoBissnes";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetPrestamoGeneralDTO serviceResponse = new GetPrestamoGeneralDTO();
        try {
            serviceResponse = ejbGetPrestamoGeneralUltimoPago.getPrestamosGenerales(msisdn, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the prestamo score max limit business.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the prestamo score max limit business
     */
    public GetPrestamoMaxScoreLimitDTO getPrestamoScoreMaxLimitBusiness(String msisdn, String trxid2) {
        String method = "getPrestamoScoreMaxLimitBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetPrestamoMaxScoreLimitDTO serviceResponse = new GetPrestamoMaxScoreLimitDTO();
        try {
            serviceResponse = ejbGetPrestamoGeneralScoreMaxLimit.getPrestamoMaxScoreLimitWS(msisdn, trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the prestamo pagado business.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the prestamo pagado business
     */
    public GetPrestamosPagadosDTO getPrestamoPagadoBusiness(String msisdn, String trxid2) {
        String method = "getPrestamoPagadoBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        return ejbPrestamosPagados.getPrestamosPagadosService(msisdn, trxid2);
    }

    /**
     * Activar ordenes hrl business.
     *
     * @param numero the numero
     * @param tipo the tipo
     * @param accion the accion
     * @param trxid the trxid
     * @return the ordenes hrl dto
     */
    public OrdenesHrlDTO activarOrdenesHRLBusiness(String numero, String tipo, String accion, String trxid) {
        String method = "activarOrdenesHRLBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  "); 
        return ejbOrdenesHrl.getOrdenesHrlService(numero, tipo, accion, trxid);
    }

    /**
     * Gets the rule engine task business.
     *
     * @param trxid2 the trxid2
     * @return the rule engine task business
     */
    public RuleEngineTaskDTO getRuleEngineTaskBusiness(String trxid2) {
        String method = "getRuleEngineTaskBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        RuleEngineTaskDTO serviceResponse = new RuleEngineTaskDTO();
        try {
            serviceResponse = ejbRuleEngaineTask.executeTask(trxid2);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the prestamos aplicables business.
     *
     * @param msisdn the msisdn
     * @param appid the appid
     * @param trxid2 the trxid2
     * @return the prestamos aplicables business
     */
    public GetPrestamosAplicablesDTO getPrestamosAplicablesBusiness(String msisdn, String appid, String trxid2) {
        String method = "getPrestamosAplicablesBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetPrestamosAplicablesDTO serviceResponse = new GetPrestamosAplicablesDTO();
        try {
            serviceResponse = ejbPrestamosAplicables.getPrestamosAplicablesService(msisdn, appid);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid2 + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the client information business.
     *
     * @param msisdn the msisdn
     * @param trxid the trxid
     * @return the client information business
     */
    public ClientInformationDTO getClientInformationBusiness(String msisdn, String trxid) {
        String method = "getClientInformationBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
        ClientInformationDTO serviceResponse = new ClientInformationDTO();
        try {
            serviceResponse = ejbClientInformation.findAnnexTechnicalInfoByPhoneNumber(trxid, msisdn);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the hlr business.
     *
     * @param externalApplicationID the external application id
     * @param externalTransactionID the external transaction id
     * @param utiReference the uti reference
     * @param user the user
     * @param msisdn the msisdn
     * @return the hlr business
     */
    public GetHLRDTO getHlrBusiness(String externalApplicationID, String externalTransactionID, String utiReference, String user, String msisdn) {
        String method = "getHlrBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionID + " inicio ...  ");
        GetHLRDTO serviceResponse = new GetHLRDTO();
        try {
            serviceResponse = ejbGetHlr.getHlrService(externalApplicationID, externalTransactionID, utiReference, user, Constantes.PREFIJO_504 + msisdn, "0");
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionID + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionID + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the back tone.
     *
     * @param msisdn the msisdn
     * @param retrieveProduction the retrieve production
     * @return the back tone
     */
    public GetBacktonesDTO getBackTone(String msisdn, Boolean retrieveProduction) {
        String method = "getBackTone";
        LOG.info("[" + clas + " - " + method + "] - MSISDN = " + msisdn + " inicio ...  ");
        GetBacktonesDTO serviceResponse = new GetBacktonesDTO();
        try {
            serviceResponse = ejbBacktones.getBacktonesServices(Constantes.PREFIJO_504 + msisdn, retrieveProduction);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + msisdn + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + msisdn + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Ms subscriber profile impl.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @param profileId the profile id
     * @return the list
     */
    public List<MsSubsProfile> msSubscriberProfileImpl(String trxid, String phone, String profileId) {
        String method = "msSubscriberProfileImpl";
        TaskResponseType serviceResponse;
        List<MsSubsProfile> listParameterType = new ArrayList<MsSubsProfile>(0);
        try {
            serviceResponse = msSubscriberProfileImplRemote.executeTaskMasterStatus(trxid, phone, profileId);
            if (serviceResponse.getResponseCode() == Constantes.MASTER_STATUS_CODIGO_EXITO) {
                listParameterType = this.buildResponse(serviceResponse.getParameters().getParameter());
            }
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("error : " + e, e);
        }
        return listParameterType;
    }

    /**
     * Gets the master status history service.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @param profileId the profile id
     * @return the master status history service
     */
    public List<MsSubsProfile> getMasterStatusHistoryService(String trxid, String phone, String profileId) {
        String method = "getMasterStatusHistoryService";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
        TaskResponseType serviceResponse;
        List<MsSubsProfile> listParameterType = new ArrayList<MsSubsProfile>();
        try {
            serviceResponse = getMasterStatusHistoryServiceRemote.getMasterStatusHistoryService(phone, profileId, trxid);
            if (serviceResponse.getResponseCode() == Constantes.MASTER_STATUS_CODIGO_EXITO) {
                listParameterType = this.buildResponse(serviceResponse.getParameters().getParameter());
            }
        } catch (Exception e) {
            LOG.error("error : " + e, e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " fin ....  ");
        return listParameterType;
    }

    /**
     * Gets the list subscriptions.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @param histo the histo
     * @return the list subscriptions
     */
    public SubscriptionsListDTO getListSubscriptions(String trxid, String phone, boolean histo) {
        SubscriptionsListDTO serviceResponse = null;
        String method = "getListSubscriptions";
        try {
            LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
            serviceResponse = getProvisioning.getListSubscriptions(trxid, phone, histo);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the list subscriber messages.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @param groupCode the group code
     * @param startDate the start date
     * @param endDate the end date
     * @return the list subscriber messages
     */
    public SubscriberMessagesDTO getListSubscriberMessages(String trxid, String phone, String groupCode, String startDate, String endDate) {
        String method = "getListSubscriberMessages";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
        SubscriberMessagesDTO serviceResponse = new SubscriberMessagesDTO();
        try {
            serviceResponse = getProvisioning.getListSubscriberMessages(trxid, phone, groupCode, startDate, endDate);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Adds the subscriber blocking.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @param groupCode the group code
     * @return the general response
     */
    public GeneralResponse addSubscriberBlocking(String trxid, String phone, String groupCode) {
        String method = "addSubscriberBlocking";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
        GeneralResponse serviceResponse = new GeneralResponse();
        try {
            serviceResponse = getProvisioning.addSubscriberBlocking(trxid, phone, groupCode);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Removes the subscriber blocking.
     *
     * @param trxid the trxid
     * @param phone the phone
     * @param groupCode the group code
     * @return the general response
     */
    public GeneralResponse removeSubscriberBlocking(String trxid, String phone, String groupCode) {
        String method = "removeSubscriberBlocking";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
        GeneralResponse serviceResponse = new GeneralResponse();
        try {
            serviceResponse = getProvisioning.removeSubscriberBlocking(trxid, phone, groupCode);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + trxid + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the as400 basic info.
     *
     * @param msisdn the msisdn
     * @param trxid the trxid
     * @return the as400 basic info
     */
    public GetAs400GetSubscriberBasicInfoDTO getAs400BasicInfo(String msisdn, String trxid) {
        String method = "getAs400BasicInfo";
        LOG.info("[" + clas + " - " + method + "] - MSISDN = " + msisdn + " inicio ...  ");
        GetAs400GetSubscriberBasicInfoDTO serviceResponse = new GetAs400GetSubscriberBasicInfoDTO();
        try {
            serviceResponse = ejbGetAs400BasicInfo.getAs400SubscriberBasicInfoService(trxid, msisdn);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + msisdn + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + msisdn + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the estado cuenta corriente.
     *
     * @param externalApplicationId the external applicationid
     * @param externaltrxId the externaltrxid
     * @param clientId the client id
     * @param startTime the start time
     * @param endTime the end time
     * @return the estado cuenta corriente
     */
    public GetEstadoCuentaCorrienteDTO getEstadoCuentaCorriente(String externalApplicationId, String externaltrxId, 
            String clientId, String startTime, String endTime) {
        String method = "getEstadoCuentaCorriente";
        LOG.info("[" + clas + " - " + method + "] - MSISDN = " + clientId + " inicio ...  ");
        GetEstadoCuentaCorrienteDTO serviceResponse = new GetEstadoCuentaCorrienteDTO();
        try {
            serviceResponse = ejbGetCuentaCorriente.getEstadoCuentaCorriente(externalApplicationId, externaltrxId, clientId, startTime, endTime);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + clientId + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + clientId + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the activos pagos parciales business.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the activos pagos parciales business
     */
    public GetActivosPagosParcialesDTO getActivosPagosParcialesBusiness(String msisdn, String trxid2) {
        String method = "getActivosPagosParcialesBusiness";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        GetActivosPagosParcialesDTO serviceResponse;
        serviceResponse = ejbActivosPagosParciales.getActivosPagosParcialesService(msisdn, trxid2);
        return serviceResponse;
    }

    /**
     * Gets the estado cuenta movimientos.
     *
     * @param externalApplicationId the external applicationid
     * @param externaltrxId the externaltrxid
     * @param clientId the client id
     * @param startTime the start time
     * @param endTime the end time
     * @return the estado cuenta movimientos
     */
    public GetCuentaMovimientoDTO getEstadoCuentaMovimientos(String externalApplicationId, String externaltrxId, 
            String clientId, String startTime, String endTime) {
        String method = "getEstadoCuentaMovimientos";
        LOG.info("[" + clas + " - " + method + "] - MSISDN = " + clientId + " inicio ...  ");
        GetCuentaMovimientoDTO serviceResponse = new GetCuentaMovimientoDTO();
        try {
            serviceResponse = ejbCuentaMovimientos.getCuentaMovimiento(externalApplicationId, externaltrxId, clientId, startTime, endTime);
            if (serviceResponse != null) {
                List<TolWctWallet> wallets = dao.getWalletTol();
                for (CuentaMovimientoDTO cuentaMovimiento : serviceResponse.getListaCuentaMovimiento()) {
                    String descripcion = Utilidades.obtenerDescripcionBilletera(wallets, cuentaMovimiento.getBilletera(), null);
                    cuentaMovimiento.setDescripcion(descripcion);
                }
            }
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + clientId + " "+Constantes.NO_DATA_FOUND+" ",e);
        }
        LOG.info("[" + clas + " - " + method + " ] - MSISDN = " + clientId + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the admin grupos.
     *
     * @param externalApplicationID the external application id
     * @param externalTransactionID the external transaction id
     * @param clientID the client id
     * @param clientType the client type
     * @return the admin grupos
     */
    public AdminGruposDTO getAdminGrupos(String externalApplicationID, String externalTransactionID, String clientID, String clientType) {
        String method = "getAdminGrupos";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionID + " inicio ...  ");
        AdminGruposDTO serviceResponse = new AdminGruposDTO();
        try {
            serviceResponse = ejbAdminGrupos.getAdminGrupos(externalApplicationID, externalTransactionID, clientID, clientType);
            List<GruposDTO> grupos = serviceResponse.getGrupos();
            for(GruposDTO grupo: grupos) {
                String statusId = grupo.getStatus();
                if(statusId.equals(Constantes.ACTIVO_ESTADO_VALUE)) {
                    grupo.setStatusDescription(Constantes.ACTIVO_VALUE);
                } else if(statusId.equals(Constantes.INACTIVO_ESTADO_VALUE)) {
                    grupo.setStatusDescription(Constantes.INACTIVO_VALUE);
                }
            }
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionID + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionID + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the admin grupo suscriptor.
     *
     * @param externalApplicationId the external application id
     * @param externalTransactionId the external transaction id
     * @param clientId the client id
     * @param clientType the client type
     * @return the admin grupo suscriptor
     */
    public AdminGrupoSuscriptorDTO getAdminGrupoSuscriptor(String externalApplicationId, String externalTransactionId, String clientId, String clientType) {
        String method = "getAdminSuscriptor";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        AdminGrupoSuscriptorDTO serviceResponse = new AdminGrupoSuscriptorDTO();
        try {
            serviceResponse = ejbAdminGrupoSuscriptor.getAdminGrupoSuscritor(externalApplicationId, externalTransactionId, clientId, clientType);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the admin grupo remove.
     *
     * @param externalApplicationId the external application id
     * @param externalTransactionId the external transaction id
     * @param clientId the client id
     * @param clientType the client type
     * @param group the group
     * @return the admin grupo remove
     */
    public AdicionarGrupoRemoveDTO getAdminGrupoRemove(String externalApplicationId, String externalTransactionId, 
            String clientId, String clientType, String group) {
        String method = "getAdminGrupoRemove";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        AdicionarGrupoRemoveDTO serviceResponse = new AdicionarGrupoRemoveDTO();
        try {
            serviceResponse = ejbAdminGrupoRemove.getAdminGrupoRemove(externalApplicationId, externalTransactionId, clientId, clientType, group);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the admin grupo member list.
     *
     * @param externalApplicationId the external application id
     * @param externalTransactionId the external transaction id
     * @param clientId the client id
     * @param clientType the client type
     * @return the admin grupo member list
     */
    public MiembrosGrupoDTO getAdminGrupoMemberList(String externalApplicationId, String externalTransactionId, String clientId, String clientType) {
        String method = "getAdminGrupoMemberList";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        MiembrosGrupoDTO serviceResponse = new MiembrosGrupoDTO();
        try {
            serviceResponse = ejbAdminGrupoMemberList.getAdminGrupoMiembroGrupo(externalApplicationId, externalTransactionId, clientId, clientType);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Gets the admin grupo add.
     *
     * @param externalApplicationId the external application id
     * @param externalTransactionId the external transaction id
     * @param clientId the client id
     * @param clientType the client type
     * @param subGroupName the sub group name
     * @param subGroupValue the sub group value
     * @param offeringId the offering id
     * @return the admin grupo add
     */
    public AdminGrupoAdicionarDTO getAdminGrupoAdd(String externalApplicationId, String externalTransactionId, 
            String clientId, String clientType, String subGroupName, String subGroupValue, String offeringId) {
        String method = "getAdminGrupoAdd";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        AdminGrupoAdicionarDTO serviceResponse = new AdminGrupoAdicionarDTO();
        try {
            serviceResponse = ejbAdminGrupoAdicionar.
                    getAdminGrupoAdicionar(externalApplicationId, externalTransactionId, clientId, 
                    clientType, subGroupName, subGroupValue, offeringId);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }

    /**
     * Builds the response.
     *
     * @param parameterList the parameter list
     * @return the list
     */
    private List<MsSubsProfile> buildResponse(List<ParameterType> parameterList) {
        Map<Integer, MsSubsProfile> mapaParameter = new HashMap<Integer, MsSubsProfile>(0);
        int size = parameterList.size();
        int indice = 0;
        for (int i = 0; i < size;) {
            ParameterType p1 = null;
            MsSubsProfile mapValue = null;
            ParameterType p0 = parameterList.get(i);
            if (p0.getName().endsWith("_ID") && !p0.getName().endsWith("_PROFILE_ID")) {
                mapValue = new MsSubsProfile();
                mapValue.setId(p0.getValue());
                try {
                    i++;
                    p1 = parameterList.get(i);
                    mapValue.setName(p1.getName());
                    mapValue.setValue(p1.getValue());
                } catch (Exception e) {
                    LOG.error("[buildResponse ",e);
                }
                indice = indice + 1;
                mapaParameter.put(indice, mapValue);
                i++;
                continue;
            }
            mapValue = mapaParameter.get(indice);
            if (p0.getName().endsWith("_DATE")) {
                mapValue.setDate(Utilidades.cambiarStringFecha(p0.getValue(), Constantes.FECHA_CON_AM_PM_ZONA, Constantes.FECHA_CON_AM_PM));
            }
            if (p0.getName().endsWith("_COMMENT")) {
                mapValue.setComment(p0.getValue());
            }
            if (p0.getName().endsWith("_PROFILE_ID")) {
                mapValue.setProfileId(p0.getValue());
            }
            if (p0.getName().endsWith("_transactionId")) {
                mapValue.setTransactionId(p0.getValue());
            }
            i++;
            mapaParameter.put(indice, mapValue);
        }
        List<MsSubsProfile> listParameterType = new ArrayList<MsSubsProfile>(mapaParameter.values());
        Collections.sort(listParameterType, new BeanComparator("id"));
        return listParameterType;
    }

    /**
     * Gets the connection home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the connection home
     */
    public ArrayObtenerConexion getConnectionHome(String msisdn, String trxid2) {
        String method = "getConnectionHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ArrayObtenerConexion serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getConnection(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Gets the active customers home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the active customers home
     */
    public ArrayClientesActivos getActiveCustomersHome(String msisdn, String trxid2) {
        String method = "getActiveCustomersHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ArrayClientesActivos serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getActiveCustomer(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Gets the history customers home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the history customers home
     */
    public ArrayHistoricoCliente getHistoryCustomersHome(String msisdn, String trxid2) {
        String method = "getHistoryCustomersHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ArrayHistoricoCliente serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getHistoryCustomer(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Gets the customers info home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the customers info home
     */
    public DatosCliente getCustomersInfoHome(String msisdn, String trxid2) {
        String method = "getCustomersInfoHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        DatosCliente serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getInformationCustomer(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Gets the email customer home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the email customer home
     */
    public ArrayEmailCliente getEmailCustomerHome(String msisdn, String trxid2) {
        String method = "getEmailCustomerHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ArrayEmailCliente serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getEmailCustomer(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Gets the identification customer home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the identification customer home
     */
    public ArrayIdentificacion getIdentificationCustomerHome(String msisdn, String trxid2) {
        String method = "getIdentificationCustomerHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ArrayIdentificacion serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getIdentificationCustomer(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Gets the promotion customer home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the promotion customer home
     */
    public ArrayPromocionClientes getPromotionCustomerHome(String msisdn, String trxid2) {
        String method = "getPromotionCustomerHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ArrayPromocionClientes serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getPromotionCustomer(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Gets the balance home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the balance home
     */
    public ObtenerSaldo getBalanceHome(String msisdn, String trxid2) {
        String method = "getBalanceHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ObtenerSaldo serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getBalance(msisdn);
        }
        return serviceResponse;
    }

    /**
     * Gets the invoicing home.
     *
     * @param msisdn the msisdn
     * @param trxid2 the trxid2
     * @return the invoicing home
     */
    public ArrayObtenerFacturacion getInvoicingHome(String msisdn, String trxid2) {
        String method = "getInvoicingHome";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        ArrayObtenerFacturacion serviceResponse = null;
        if (msisdn != null) {
            serviceResponse = ejbHome.getInvoicing(Long.parseLong(msisdn));
        }
        return serviceResponse;
    }

    /**
     * Deactivate group.
     *
     * @param trxid2 the trxid2
     * @param groupId the group id
     * @return the delete group response type
     */
    public DeleteGroupResponseType deactivateGroup(String trxid2, String groupId) {
        String method = "deactivateGroup";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        DeleteGroupResponseType serviceResponse = null;
        if (groupId != null) {
            serviceResponse = ejbGroup.deactivateGroup(trxid2, groupId);
        }
        return serviceResponse;
    }

    /**
     * Creates the group.
     *
     * @param trxid2 the trxid2
     * @param groupId the group id
     * @param groupName the group name
     * @param offeringId the offering id
     * @param clientId the client id
     * @return the creates the group response type
     */
    public CreateGroupResponseType createGroup(String trxid2, String groupId,String groupName, String offeringId, String clientId) {
        String method = "createGroup";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + trxid2 + " inicio ...  ");
        CreateGroupResponseType serviceResponse = null;
        serviceResponse = ejbGroup.createGroups(trxid2, groupId, groupName, offeringId, clientId);
        return serviceResponse;
    }

    /**
     * Gets the admin grupos carga masiva.
     *
     * @param externalTransactionId the external transaction id
     * @param clientsId the clients id
     * @param clientType the client type
     * @param groupName the group name
     * @param groupValue the group value
     * @param offeringId the offering id
     * @return the admin grupos carga masiva
     */
    public AdminGrupoAdicionarDTO getAdminGruposCargaMasiva(String externalTransactionId, List<String> clientsId, 
            String clientType, String groupName, String groupValue, String offeringId) {
        String method = "getAdminGrupos";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        AdminGrupoAdicionarDTO serviceResponse = new AdminGrupoAdicionarDTO();
        try {
            serviceResponse = ejbAdminGrupoAdicionar.getAdminGroupAddMass(externalTransactionId, clientsId, clientType, groupName, groupValue, offeringId);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }
    
    /**
     * Gets the query provisioning operator imei status.
     *
     * @param externalTransactionId transaccion id
     * @param id msisdn or customer phone
     * @param startTime initial date of the range
     * @param endTime final range's date
     * @return response with operator IMEI state
     */
    public BasicGetOperatorIMEIStateResult getQueryProvisioningOperatorIMEIStatus(String externalTransactionId, String id, XMLGregorianCalendar startTime, XMLGregorianCalendar endTime) {
        String method = "getQueryProvisioningOperatorIMEIStatus";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        BasicGetOperatorIMEIStateResult serviceResponse = new BasicGetOperatorIMEIStateResult();
        try {
            serviceResponse = ejbQueryProvisioningOrders.getOperatorIMEIState(id, Constantes.QUERY_PROV_ID_TYPE, startTime, endTime, externalTransactionId);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }
    
    /**
     * Gets the provisioning orders by phone.
     *
     * @param externalTransactionId transaccion id
     * @param id msisdn or customer phone
     * @param startTime initial date of the range
     * @param endTime final range's date
     * @return response with provisioning orders by phone
     */
    public BasicGetProvisioningOrdersByPhoneResult getProvisioningOrdersByPhone(String externalTransactionId, String id, XMLGregorianCalendar startTime, XMLGregorianCalendar endTime) {
        String method = "getProvisioningOrdersByPhone";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        BasicGetProvisioningOrdersByPhoneResult serviceResponse = new BasicGetProvisioningOrdersByPhoneResult();
        try {
            serviceResponse = ejbQueryProvisioningOrders.getProvisioningOrdersByPhone(id, Constantes.QUERY_PROV_ID_TYPE, startTime, endTime, externalTransactionId);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }
    
    /**
     * Gets the provisioning orders lte.
     *
     * @param externalTransactionId transaccion id
     * @param id msisdn or customer phone
     * @param startTime initial date of the range
     * @param endTime final range's date
     * @return response with provisioning LTE orders included
     */
    public BasicGetProvisioningOrdersLTEResult getProvisioningOrdersLTE(String externalTransactionId, String id, XMLGregorianCalendar startTime, XMLGregorianCalendar endTime) {
        String method = "getProvisioningOrdersLTE";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        BasicGetProvisioningOrdersLTEResult serviceResponse = new BasicGetProvisioningOrdersLTEResult();
        try {
            serviceResponse = ejbQueryProvisioningOrders.getProvisioningOrdersLTE(id, Constantes.QUERY_PROV_ID_TYPE, startTime, endTime, externalTransactionId);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }
    
    /**
     * Gets the provisioning orders by user.
     *
     * @param externalTransactionId transaccion id
     * @param id user id
     * @param startTime initial date of the range
     * @param endTime final range's date
     * @return response with provisioning orders by user
     */
    public BasicGetProvisioningOrdersByUserResult getProvisioningOrdersByUser(String externalTransactionId, String id, XMLGregorianCalendar startTime, XMLGregorianCalendar endTime) {
        String method = "getProvisioningOrdersByUser";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        BasicGetProvisioningOrdersByUserResult serviceResponse = new BasicGetProvisioningOrdersByUserResult();
        try {
            serviceResponse = ejbQueryProvisioningOrders.getProvisioningOrdersByUser(id, Constantes.QUERY_PROV_USR_ID_TYPE, startTime, endTime, externalTransactionId);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }
    
    /**
     * Gets the IMEI state.
     *
     * @param externalTransactionId transaccion id
     * @param id imei number
     * @param startTime initial date of the range
     * @param endTime final range's date
     * @return response with IMEI state
     */
    public BasicGetIMEIStateResult getIMEIState(String externalTransactionId, String id, XMLGregorianCalendar startTime, XMLGregorianCalendar endTime) {
        String method = "getIMEIState";
        LOG.info("[" + clas + " - " + method + "] - "+Constantes.TRXID+" = " + externalTransactionId + " inicio ...  ");
        BasicGetIMEIStateResult serviceResponse = new BasicGetIMEIStateResult();
        try {
            serviceResponse = ejbQueryProvisioningOrders.getIMEIState(id, Constantes.QUERY_PROV_IMEI_ID_TYPE, startTime, endTime, externalTransactionId);
        } catch (Exception e) {
            LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " "+Constantes.NO_DATA_FOUND+" ");
            LOG.error("[" + clas + " - " + method + " ] Exception error : " + e);
        }
        LOG.info("[" + clas + " - " + method + " ] - "+Constantes.TRXID+" = " + externalTransactionId + " fin ....  ");
        return serviceResponse;
    }
    
    /**
     * Gets the prestamos pagados header.
     *
     * @param trxid the trxid
     * @param telefono the telefono
     * @return the prestamos pagados header
     */
    public List<PrestamoPagadoHeader> getPrestamosPagadosHeader(String trxid, String telefono){
        List<PrestamoPagadoHeader> response = new ArrayList<PrestamoPagadoHeader>(0);
        try {
            List<PrestamoPagadoHeader> responseService = ejbPRestamoPagadoHeader.getPrestamosPagadosHeader(telefono, trxid);
            if(responseService !=null && !responseService.isEmpty()){
                RuleEngineTaskDTO responseRule = ejbRuleEngaineTask.executeTask(trxid);
                if(responseRule!=null){
                    response=getResponse(response, responseService, responseRule);
                }
            }
        } catch (AdapterException_Exception ex) {
            LOG.error("[" + clas + " - getPrestamosPagadosHeader ] Exception error : " + ex, ex);
        }
        return response;
    }

	/**
	 * Gets the response.
	 *
	 * @param response2 the response2
	 * @param responseService the response service
	 * @param responseRule the response rule
	 * @return the response
	 */
	private List<PrestamoPagadoHeader> getResponse(List<PrestamoPagadoHeader> response2,List<PrestamoPagadoHeader> responseService,
			RuleEngineTaskDTO responseRule) {
		List<PrestamoPagadoHeader> response = response2;
		boolean flag;
		 for (PrestamoPagadoHeader current : responseService) {
		    flag=true;
		    for (Product names : responseRule.getRuleEngineTaskResp().getProduct()) {
		        if (current.getProducto().equals(names.getCode())) {
		            current.setProductoNombre(names.getName() + " (" + names.getCode() + ")");
		            response.add(current);
		            flag=false;
		            break;
		        }
		    }
		    if(flag){
		        current.setProductoNombre(" (" +current.getProducto()+ ")");
		        response.add(current);
		    }
		}
		return response;
	}
    
      /**
       * List sus restriccion.
       *
       * @param id the id
       * @return the list
       */
      public List<TolSuSuspencionRestriccion> listSusRestriccion(String id){
        LOG.info("[" + clas + " -listSusRestriccion ] - "+Constantes.TRXID+" = " + id + " inicio ...  ");
        List<TolSuSuspencionRestriccion>list=new ArrayList<TolSuSuspencionRestriccion>();
        try{
           list= dao.susResList(id);
        }catch(Exception e){
            LOG.error("[" + clas + " -  listSusRestriccion  ] Exception error : " + e);
        }
        return list;
    }

   /**
    * Basic subscriber info result.
    *
    * @param subsCriberId the subs criber id
    * @param id the id
    * @return the basic subscriber info result
    */
   public BasicSubscriberInfoResult basicSubscriberInfoResult(String subsCriberId,String id){
        BasicSubscriberInfoResult basicSubscriberInfoResult=null;
        LOG.info("[" + clas + " -basicSubscriberInfoResult ] - "+Constantes.TRXID+" = " + id + " inicio ...  ");
        try{
            basicSubscriberInfoResult=basicSubscriberInfoEjb.basicSubscriberInfoResult(subsCriberId, id);
        }catch(Exception e){
           LOG.error("[" + clas + " -  basicSubscriberInfoResult  ] Exception error : " + e); 
        }
       return basicSubscriberInfoResult;
   }   
   
    /**
     * Active loans.
     *
     * @param trxid the trxid
     * @param msisdn the msisdn
     * @return the gets the act loans dto
     */
    public GetActLoansDTO activeLoans(String trxid,String msisdn){
        GetActLoansDTO response=null;
        LOG.info("[" + clas + " -activeLoans ] - "+Constantes.TRXID+" = " + trxid + " inicio ...  ");
        try{
            response = activeLoans.executeTask(trxid,msisdn);
        }catch(Exception e){
           LOG.error("[" + clas + " -  activeLoans  ]  "+Constantes.TRXID+" = " + trxid+" Exception error : " + e); 
        }
            
       return response;
   }
    
    
    /**
     * Oferta channels.
     *
     * @return the list
     */
    public List<TolChannels> ofertaChannels() {
        String method = "ofertaChannels";
        LOG.info("[" + clas + " - " + method + " ] -  inicio metodo: ");
        List<TolChannels> list = new ArrayList<TolChannels>();
        try {
            list = dao.consultarOfertaChannels();
        } catch (Exception e) {
            LOG.error("[" + clas + " - " + method + " ] -  Error: ", e);
        }
        LOG.info("[" + clas + " - " + method + " ] -  fin metodo: ");
        return list;
    }
    
    
    /**
     * Oferta by crmark.
     *
     * @param trxid the trxid
     * @param reference the reference
     * @return the string
     */
    public String ofertaByCrmark(String trxid,String reference){
        String res="";
        String method = "ofertaByCrmark";
        try{
         GetInsuranceDetailResponseType response= getInsuranceDetailService.getInsuranceDetailResponseType(trxid, reference);
         if(response!=null &&  response.getInsuranceDetails()!=null 
                 && response.getInsuranceDetails().getInsuranceDetail()!=null){
             for(InsuranceDetailType obj:response.getInsuranceDetails().getInsuranceDetail()){
                 res=obj.getProductDescription();
             }
         } 
        }catch(Exception e){
        	LOG.error("[" + clas + " - " + method + " ] -  Error: ", e);
        }
        return res;
    }
}
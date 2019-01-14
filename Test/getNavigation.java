/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hn.com.tigo.cccportal.managedbean.f2.getnavegation;

import hn.com.tigo.cccportal.common.Constantes;
import hn.com.tigo.cccportal.ebj.bussines.implement.CccPortaBussinesImplement;
import hn.com.tigo.cccportal.managedbean.common.JsfUtilsClass;
import hn.com.tigo.cccportal.managedbean.common.TabManagedBean;
import hn.com.tigo.cccportal.util.LoggerUtil;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.NavigationData;
import hn.com.tigo.tolcccserviceconsumer.bussines.f2.dto.getnavegation.NavigationResponse;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.wsintegration.basicsubscriber.BasicSubscriberInfoResult;
import hn.com.tigo.tolcccserviceconsumer.util.Utilidades;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;

/**
 * The Class GetNavegationBean.
 *
 */
@ManagedBean(name = "getNavegationBean")
@ViewScoped
public class GetNavegationBean extends JsfUtilsClass implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** The log. */
    LoggerUtil log = LoggerUtil.getInstance(GetNavegationBean.class);
    
    /** The clas. */
    String clas = GetNavegationBean.class.getSimpleName();
    
    /** The ejb. */
    @EJB
    public CccPortaBussinesImplement ejb;
    
    /** The msisdn. */
    String msisdn;
    
    /** The response service. */
    NavigationResponse responseService;
    
    /** The tabla. */
    private List<NavigationData> tabla = new ArrayList<NavigationData>(0);
    
    /** The bean. */
    @ManagedProperty(value = "#{tabManagedBean}")
    private TabManagedBean bean;

    /**
     * Process.
     */
    public void process() {
        String method = "process";
        try {
            tabla.clear();
            msisdn = bean.getTelefono();
            String trxid = Utilidades.getUUID();
            String description = "Consulta de navegaciÃ³n e internet del nÃºmero " + msisdn;
            if (msisdn != null && !msisdn.isEmpty()) {
                registrarLog(msisdn, Constantes.OPTION_LOG_CONSULTAR, description);
            }
            String response = getWhiteOrBlackList(msisdn);
            if (response.isEmpty()) {
                    String subsType = this.getSubscriptorType(trxid);
                    if(subsType!=null && subsType.length()>0){
                    	//msisdn = Constantes.PREFIJO_504.concat(msisdn);
                        responseService = ejb.getNavegationBusinessCPE(msisdn, trxid);
                    }else{
                        addMessage("No se encontro el tipo de suscriptor del nÃºmero ingresado");
                    }
                if (responseService != null && responseService.getParameters() != null) {
                    tabla = responseService.getParameters();
                }else{
                    displayInfoMessageToUser("No se encontrÃ³ informaciÃ³n relacionada al nÃºmero ingresado");
                }
            }else{
            	addMessage(response);
            }
        } catch (Exception e) {
            log.error("[" + clas + " - " + method + " ] - TRXID = trxid Error: ", e);
        }
    }

    /**
     * Clean.
     */
    public void clean() {
        msisdn = "";
        tabla.clear();
        resetTableById("tbl_1GetNavegationWid");
    }

    /**
     * Gets the msisdn.
     *
     * @return the msisdn
     */
    public String getMsisdn() {
        return msisdn;
    }

    /**
     * Sets the msisdn.
     *
     * @param msisdn the new msisdn
     */
    public void setMsisdn(String msisdn) {
        this.msisdn = msisdn;
    }

    /**
     * Gets the response service.
     *
     * @return the response service
     */
    public NavigationResponse getResponseService() {
        return responseService;
    }

    /**
     * Sets the response service.
     *
     * @param responseService the new response service
     */
    public void setResponseService(NavigationResponse responseService) {
        this.responseService = responseService;
    }

    /**
     * Gets the tabla.
     *
     * @return the tabla
     */
    public List<NavigationData> getTabla() {
        return tabla;
    }

    /**
     * Sets the tabla.
     *
     * @param tabla the new tabla
     */
    public void setTabla(List<NavigationData> tabla) {
        this.tabla = tabla;
    }

    /**
     * Gets the log.
     *
     * @return the log
     */
    public LoggerUtil getLog() {
        return log;
    }

    /**
     * Sets the log.
     *
     * @param log the new log
     */
    public void setLog(LoggerUtil log) {
        this.log = log;
    }

    /**
     * Gets the clas.
     *
     * @return the clas
     */
    public String getClas() {
        return clas;
    }

    /**
     * Sets the clas.
     *
     * @param clas the new clas
     */
    public void setClas(String clas) {
        this.clas = clas;
    }

    /**
     * Gets the bean.
     *
     * @return the bean
     */
    public TabManagedBean getBean() {
        return bean;
    }

    /**
     * Sets the bean.
     *
     * @param bean the new bean
     */
    public void setBean(TabManagedBean bean) {
        this.bean = bean;
    }

    /**
     * Gets the subscriptor type.
     *
     * @param trxid the trxid
     * @return the subscriptor type
     */
    private String getSubscriptorType(String trxid) {
        String response = "";
        BasicSubscriberInfoResult obj= ejb.basicSubscriberInfoResult(this.msisdn,trxid);
        if(obj!=null && obj.getCodigoRes().equals("0000")){
            response=obj.getType();
        }
        return response ;
    }
}
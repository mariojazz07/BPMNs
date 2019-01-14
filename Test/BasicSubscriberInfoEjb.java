/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hn.com.tigo.tolcccserviceconsumer.bussines.f3.ejb;

import hn.com.tigo.tolcccserviceconsumer.bussines.f3.wsintegration.basicsubscriber.BasicSubscriberInfoResult;
import hn.com.tigo.tolcccserviceconsumer.bussines.f3.wsintegration.basicsubscriber.BasicSubscriberSOAP;
import hn.com.tigo.tolcccserviceconsumer.common.Constantes;
import hn.com.tigo.tolcccserviceconsumer.util.LoggerUtil;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;

/**
 *
 * @author ingeneo
 */
@Stateless(name = "BasicSubscriberInfoEjb", mappedName = "ejb/BasicSubscriberInfoEjb")
@LocalBean
public class BasicSubscriberInfoEjb {
    /** The Constant CLASS_NAME. */
    private static final String CLASS_NAME = BasicSubscriberInfoEjb.class.getCanonicalName();

    /** The log. */
    private static LoggerUtil LOG = new  LoggerUtil(BasicSubscriberInfoEjb.class);

    /**
     * Basic subscriber info result.
     *
     * @param subsCriberId the subs criber id
     * @param trxId the trx id
     * @return the basic subscriber info result
     */
    public BasicSubscriberInfoResult basicSubscriberInfoResult(String subsCriberId, String trxId){
        LOG.addLogMessage(Constantes.INFO, CLASS_NAME, "basicSubscriberInfoResult", "start .....");
        BasicSubscriberInfoResult res=null;
        try{
          res=  BasicSubscriberSOAP.basicSubscriberInfoResult(Constantes.SUB_BASIC_INFO_USER, Constantes.SUB_BASIC_INFO_PASS, subsCriberId, trxId, trxId);
        }catch(Exception e){
            res=new BasicSubscriberInfoResult();
            res.setCodigoRes("99");
            res.setRespuesta(e.getMessage());
        }
        LOG.addLogMessage(Constantes.INFO, CLASS_NAME, "basicSubscriberInfoResult", "End: "+res);
        return res;
    }
}
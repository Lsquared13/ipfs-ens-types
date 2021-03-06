import { HttpMethods, MessageResult, MessageResponse, ApiResponse } from '@eximchain/api-types/spec/responses';
import { apiBasePath, RootResources } from '../index'
import Deployment from '../../deployment';

export const privateBasePath = `${apiBasePath}/${RootResources.deployments}`;

function DeployPath(name:string){
  return `${privateBasePath}/${name}`;
}

export namespace CreateDeployment {
  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = DeployPath;

  export type Args = Deployment.DeployArgs;
  export const isArgs = Deployment.isDeployArgs;
  export const newArgs = Deployment.newDeployArgs;

  export type Result = MessageResult;
  export type Response = MessageResponse;
}

export namespace ReadDeployment {
  export const HTTP:HttpMethods.GET = 'GET';
  export const Path = DeployPath;

  export type Args = void;

  export interface FoundOwnResult {
    exists: true
    owned: true
    item: Deployment.DeployItem
  }
  
  export interface FoundOtherResult {
    exists: true
    owned: false
    item: null
  }

  export interface NotFoundResult {
    exists: false
    owned: false
    item: null
  }

  export type Result = FoundOwnResult | FoundOtherResult | NotFoundResult;

  export type Response = ApiResponse<Result>
}

export namespace ListDeployments {
  export const HTTP:HttpMethods.GET = 'GET';
  export const Path = privateBasePath;

  export type Args = void;

  export interface Result {
    count: number
    items: Deployment.DeployItem[]
  }
  export type Response = ApiResponse<Result>
}
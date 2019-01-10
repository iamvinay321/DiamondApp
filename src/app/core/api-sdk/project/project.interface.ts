export interface ProjectRequest {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    id?: number;

    Construction_Type:string;
    product_type:string;
    size:number;
}
export interface ProjectAssign extends ProjectRequest{
    
    project_id: number;
    employee_id:string;
    position:string
    // start_date:string
    // end_date:string;

//  id','project_id','employee_id','position','start_date','end_date',
}

// export interface Project extends ProjectRequest {
export interface Project extends ProjectRequest,Demo{
    project: string;
    project_status: string;
    project_number:string;
    project_description:string;
    project_managers:string;
    project_stage:string;
    projected_gp:number;

    estimated_start

    system_of_origin: string;
    database_stamp: string;


}


export interface ChangePasswordRequest {
    old_password: string,
    new_password: string
}

export interface Demo {
    procore_index: number,
    pjm_index: number,
    system_of_origin:string,
}
export interface Address {
    address: string,
    city: string,
    state:string,
    zip: string,
    latitude: string,
    longitude:string,
    phone:string;
    
    created: string,
    last_updated: number,
    procore_status:boolean,
    sage_status:string;

}

export interface Worker {
   customer_id : string,
    customer_name : string,
    architect : string,
    division : string,
    contract_type : string,
    team_leader : string,
    project_managers : string,
    superintendents : string,
    original_contract_value : number,
    approved_contract_changes :  number,
    revised_contract_value : number,
}

export interface Costing {
        jtd_work_billed : number,
        jtd_retainage_held : number,
        jtd_payments_received : number,
        original_estimated_cost : number,
        approved_estimate_changes : number,
        revised_estimated_cost : number,
        original_committed_cost : number
        approved_commitment_changes : number
        revised_committed_cost : number,
        jtd_cost : number,
        jtd_payments_made : number,
        projected_post : number,
        original_gp : number,
        original_gp_percent : number,
        projected_gp_percent : number,
        gain_fade : number,
        gain_fade_percent : number,
        database_stamp : string
        is_deleted : string
}






//     procore_index : models.FloatField(null=True,blank=True)
//     pjm_index = models.DecimalField(max_digits=28,null=True,blank=True,decimal_places=10)
//     system_of_origin = models.CharField(max_length=7)

//     project = models.CharField(max_length=53)
//     project_number = models.CharField(max_length=15,null=True,blank=True)
//     project_description = models.CharField(max_length=35,null=True,blank=True)
//     project_managers = models.CharField(max_length=255,null=True,blank=True)
//     project_stage = models.CharField(max_length=255,null=True,blank=True)
//     projected_gp = models.DecimalField(max_digits=28,null=True,blank=True,decimal_places=10)

//     address = models.CharField(max_length=71,null=True,blank=True)
//     city = models.CharField(max_length=35,null=True,blank=True)
//     state = models.CharField(max_length=9,null=True,blank=True)
//     zip = models.CharField(max_length=15,null=True,blank=True)
//     latitude = models.FloatField(null=True,blank=True)
//     longitude = models.FloatField(null=True,blank=True)
//     phone = models.CharField(max_length=20,null=True,blank=True)
//     created = models.CharField(max_length=255,null=True,blank=True)
//     last_updated = models.CharField(max_length=255,null=True,blank=True)
//     procore_status = models.NullBooleanField()
//     sage_status = models.CharField(max_length=25,null=True,blank=True)

//     project_status = models.CharField(max_length=8) 
//     Construction_Type = models.CharField(max_length=20,null=True,blank=True)
//     product_type = models.CharField(max_length=20,null=True,blank=True)
//     size = models.BigIntegerField(null=True,blank=True)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//     estimated_start = models.DateTimeField(default=None,null=True)
//     revised_start = models.DateTimeField(default=None,null=True)
//     actual_start = models.DateTimeField(default=None,null=True)
//     estimated_completion = models.DateTimeField(default=None,null=True)
//     revised_completion = models.DateTimeField(default=None,null=True)
//     actual_completion = models.DateTimeField(default=None,null=True)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//     customer_id = models.CharField(max_length=15,null=True,blank=True)
//     customer_name = models.CharField(max_length=55,null=True,blank=True)
//     architect = models.CharField(max_length=255,null=True,blank=True)
//     division = models.CharField(max_length=22,null=True,blank=True)
//     contract_type = models.CharField(max_length=255,null=True,blank=True)
//     team_leader = models.CharField(max_length=255,null=True,blank=True)
//     project_managers = models.CharField(max_length=255,null=True,blank=True)
//     superintendents = models.CharField(max_length=255,null=True,blank=True)
//     original_contract_value = models.FloatField(null=True,blank=True)
//     approved_contract_changes =  models.FloatField(null=True,blank=True)
//     revised_contract_value = models.FloatField(null=True,blank=True)
//     jtd_work_billed = models.FloatField(null=True,blank=True)
//     jtd_retainage_held = models.FloatField(null=True,blank=True)
//     jtd_payments_received = models.FloatField(null=True,blank=True)
//     original_estimated_cost = models.FloatField(null=True,blank=True)
//     approved_estimate_changes = models.FloatField(null=True,blank=True)
//     revised_estimated_cost = models.FloatField(null=True,blank=True)
//     original_committed_cost = models.FloatField(null=True,blank=True)
//     approved_commitment_changes = models.FloatField(null=True,blank=True)
//     revised_committed_cost = models.FloatField(null=True,blank=True)
//     jtd_cost = models.FloatField(null=True,blank=True)
//     jtd_payments_made = models.FloatField(null=True,blank=True)
//     projected_post = models.FloatField(null=True,blank=True)
//     original_gp = models.FloatField(null=True,blank=True)
//     original_gp_percent = models.FloatField(null=True,blank=True)
//     projected_gp_percent = models.FloatField(null=True,blank=True)
//     gain_fade = models.FloatField(null=True,blank=True)
//     gain_fade_percent = models.FloatField(null=True,blank=True)
//     database_stamp = models.CharField(max_length=4)
//     is_deleted = models.BooleanField(default=False)